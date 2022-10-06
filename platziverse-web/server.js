"use strict";

const debug = require("debug")("donbosco:web");
const http = require("http");
const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const chalk = require("chalk");
const cors = require("cors");
const PlatziverseAgent = require("platziverse-agent");

const { pipe } = require("./util");
const proxy = require("./proxy");

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const agent = new PlatziverseAgent();

// Security
const whitelist = [
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:8000",
  "http://localhost:1883",
  "http://192.168.0.150:8080",
  "http://192.168.0.150:3000",
  "http://192.168.0.150:8000",
  "http://192.168.0.150:1883",
  "http://192.168.0.108:8080",
  "http://192.168.0.108:3000",
  "http://192.168.0.108:8000",
  "http://192.168.0.108:1883",
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));
if (true) {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Request-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, PUT, GET, PATCH, DELETE, OPTIONS"
    );
    next();
  });
}

app.use(express.static(path.join(__dirname, "public")));
app.use("/", proxy);

io.on("connect", (socket) => {
  debug(`Connected ${socket.id}`);

  pipe(agent, socket);
});

app.use((err, req, res, next) => {
  debug(`${chalk.red(["Error"])} ${err.message}`);

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message });
  }

  res.status(500).send({ error: err.message });
});

app.get("*", function (req, res) {
  res.redirect("/");
});

function handleFatalError(err) {
  console.error(`${chalk.red("[fatl error]")} ${err.message}`);
  console.log(err.stack);
  process.exit(1);
}

process.on("uncaughtException", handleFatalError);
process.on("unhandledRejection", handleFatalError);

server.listen(port, () => {
  debug(`Listening in ${chalk.green([`http://localhost:${port}`])}`);
  agent.connect();
});
