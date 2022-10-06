# Node-avanced

`sudo systemctl stop mosquitto`
`docker-compose up -d`

En api, mqtt y web: `npm run start-dev`

`ps aux | grep "mosquitto"`
`kill -9 #`

`[api, mqtt, web]: npm run start-dev`

__Ports:__

* 5432: postgres
* 5050: pgadmin4
* 3000: api
* 6379: Redis
* 1883: mqtt
* 8080: web

__Scripts:__

habilitar puertos: `sudo ufw allow 1883/tcp`
ejecutar agente: `node examples/index.js`
ejectuar node-cli: `node platziverse.js`
