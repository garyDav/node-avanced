"use strict";

const express = require("express");
const axios = require("axios");
const mqtt = require("mqtt");

const { endpoint, apiToken } = require("./config");

const api = express.Router();
const client = mqtt.connect("mqtt://localhost:1883");

api.get("/agents", async (req, res, next) => {
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    json: true,
  };

  let result;
  try {
    result = await axios
      .get(`${endpoint}/api/agents`, options)
      .then((res) => res.data);
  } catch (error) {
    next(error);
  }

  res.send(result);
});

api.get("/agents/:uuid", async (req, res, next) => {
  const { uuid } = req.params;
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    json: true,
  };
  let agent;
  try {
    agent = await axios
      .get(`${endpoint}/api/agents/${uuid}`, options)
      .then((res) => res.data);
  } catch (error) {
    next(error);
  }

  res.send(agent);
});

api.get("/metrics/:uuid", async (req, res, next) => {
  const { uuid } = req.params;
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    json: true,
  };

  let result;
  try {
    result = await axios
      .get(`${endpoint}/api/metrics/${uuid}`, options)
      .then((res) => res.data);
  } catch (error) {
    next(error);
  }

  res.send(result);
});

api.get("/metrics/:uuid/:type", async (req, res, next) => {
  const { uuid, type } = req.params;
  const options = {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    json: true,
  };

  let result;
  try {
    result = await axios
      .get(`${endpoint}/api/metrics/${uuid}/${type}`, options)
      .then((res) => res.data);
  } catch (error) {
    next(error);
  }

  res.send(result);
});

api.get("/publish/:change", async (req, res, next) => {
  const { change } = req.params;
  if (change === "enabled") {
    client.publish("agent/actuador", change);
  } else {
    client.publish("agent/actuador", change);
  }
  res.send({ activate: change });
});

module.exports = api;
