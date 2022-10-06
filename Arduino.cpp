#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <DHT_U.h>

// Update these with values suitable for your network.
byte mac[] = {0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0xED};
IPAddress server(192, 168, 0, 108); // Ip broker

const byte pinDht = 2;
const byte pinStierra = A0;
const byte pinLdr = A1;
const byte pinLluvia = 3;
const byte motor = 5;
const byte led = 12;

int valorLluvia;
int valorTierra;
int valorLdr;
int temperatura;
int humedad;
unsigned long lastMsg = 0;
const char *broker = "agent/message";
const char *arduino = "agent/actuador";

LiquidCrystal_I2C lcd(0x27, 16, 2);
DHT dht(pinDht, DHT11);

// Callback function header
void callback(char *topic, byte *payload, unsigned int length);

EthernetClient ethClient;
PubSubClient client(server, 1883, callback, ethClient);

// Callback function
void callback(char *topic, byte *payload, unsigned int length)
{
  // turn the LED ON if the payload is '1' and publish to the MQTT server a confirmation message
  if (payload[0] == 100)
  {
    digitalWrite(motor, LOW);
    digitalWrite(led, HIGH);
    client.publish(broker, "Motor On");
  }
  Serial.println("Motor - Led -> ON ");
  // turn the LED OFF if the payload is '0' and publish to the MQTT server a confirmation message
  if (payload[0] == 101)
  {
    digitalWrite(motor, HIGH);
    digitalWrite(led, LOW);
    client.publish(broker, "Motor Off");
    Serial.println("Motor - Led -> OFF ");
  }
} // void callback

void publishMessage(const char *topic, String payload, boolean retained)
{
  if (client.publish(topic, payload.c_str(), true))
    Serial.println("Message publised [" + String(topic) + "]: " + payload);
}

String formatAgent(String uuid, String type, String value, String name2 = "Sensor", String username = "Arduino", int pid = 100, String hostname2 = "localhost")
{
  String result = "";
  result.concat("{\"agent\": {\"uuid\":\"");
  result.concat(uuid);
  result.concat("\", \"name\": \"");
  result.concat(name2);
  result.concat("\", \"username\": \"");
  result.concat(username);
  result.concat("\", \"pid\": ");
  result.concat(pid);
  result.concat(", \"hostname\": \"");
  result.concat(hostname2);
  result.concat("\"}, \"metrics\": [{\"type\": \"");
  result.concat(type);
  result.concat("\", \"value\": \"");
  result.concat(value);
  result.concat("\"}]}");
  return result;
}

void setup()
{
  lcd.init();
  lcd.backlight();
  dht.begin();
  pinMode(pinLluvia, INPUT);
  pinMode(motor, OUTPUT);
  pinMode(led, OUTPUT);
  Serial.begin(9600);
  digitalWrite(motor, LOW);
  lcd.setCursor(0, 0);
  lcd.print("Inciando modulos");
  if (Ethernet.begin(mac) == 0)
  {
    Serial.println(F("Unable to configure Ethernet using DHCP"));
    for (;;)
      ;
  }
  Serial.println(F("Ethernet configured via DHCP"));
  Serial.print("IP address: ");
  Serial.println(Ethernet.localIP());
  Serial.println();
  if (client.connect("arduinoClient"))
  {
    client.publish(broker, "Hola broker, ya te llegan los datos");
    client.subscribe(arduino);
  }
}

void loop()
{
  client.loop();
  lcd.clear();
  temperatura = dht.readTemperature();
  humedad = dht.readHumidity();
  valorTierra = analogRead(pinStierra);
  valorTierra = map(valorTierra, 0, 1024, 0, 100);
  valorLdr = analogRead(pinLdr);
  valorLdr = map(valorLdr, 0, 1024, 0, 100);
  valorLluvia = digitalRead(pinLluvia);
  if (valorLluvia == HIGH)
  {
    valorLluvia = 0;
  }
  else
  {
    valorLluvia = 1;
  }
  // Mostramos los datos en pantalla
  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temperatura);
  lcd.print("C ");
  lcd.print("H:");
  lcd.print(humedad);
  lcd.print("% ");
  lcd.print("L:");
  lcd.print(valorLdr);
  lcd.print("% ");
  lcd.setCursor(0, 1);
  lcd.print("H.Sue:");
  lcd.print(valorTierra);
  lcd.print("% ");
  lcd.print("Lluv:");
  lcd.print(valorLluvia);
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println("°C");
  Serial.print("Humedad: ");
  Serial.print(humedad);
  Serial.println("%");
  Serial.print("Luz: ");
  Serial.print(valorLdr);
  Serial.println("%");
  Serial.print("Humedad Suelo: ");
  Serial.print(valorTierra);
  Serial.println("%");
  Serial.print("Lluvia: ");
  Serial.println(valorLluvia);
  Serial.println("");
  publishMessage(broker, formatAgent("Temp", " C", String(temperatura), "Temperatura"), true);
  publishMessage(broker, formatAgent("Hum", " por ciento", String(humedad), "Humedad"), true);
  publishMessage(broker, formatAgent("Luz", " por ciento", String(valorLdr), "Luz solar"), true);
  publishMessage(broker, formatAgent("HSuelo", " por ciento", String(valorTierra), "Humedad del suelo"), true);
  publishMessage(broker, formatAgent("Ll", " 1 = SI && 0 = NO", String(valorLluvia), "Lluvia"), true);
  delay(2000);
}