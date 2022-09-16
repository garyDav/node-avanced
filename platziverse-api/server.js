"use strict";

const debug = require("debug")("donbosco:api");
const chalk = require("chalk");
const http = require("http");
const express = require("express");
const cors = require("cors");

const api = require("./api");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Security
const whitelist = [
  "http://192.168.1.200:8080",
  "http://192.168.1.200:3000",
  "http://192.168.1.200:8000",
  "http://192.168.1.200:1883",
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

app.use("/api", api);

app.use((err, req, res, next) => {
  debug(`${chalk.red(["Error"])} ${err.message}`);

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message });
  }

  res.status(500).send({ error: err.message });
});

function handleFatalError(err) {
  debug(`${chalk.red(["Error"])} ${err.message}`);
  debug(err.stack);
  process.exit(1);
}

if (require.main === module) {
  process.on("uncaughtException", handleFatalError);
  process.on("unhandledRejection", handleFatalError);

  server.listen(port, () => {
    debug(`listening in ${chalk.green(`http://localhost:${port}`)}`);
  });
}

module.exports = server;
