"use strict";

const db = require("../");

async function run() {
  const config = {
    database: process.env.DB_NAME || "db_donbosco",
    username: process.env.DB_USER || "dbuser",
    password: process.env.DB_PASSWORD || "dbpass",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  };

  const { Agent, Metric } = await db(config).catch(handleFatalError);

  const agent = await Agent.createOrUpdate({
    uuid: "yyy",
    name: "Arduino UNO",
    username: "admin",
    hostname: "localhost",
    pid: 1001,
    connected: true,
  }).catch(handleFatalError);

  console.log("--agent--");
  console.log(agent);

/*  const agents = await Agent.findAll().catch(handleFatalError);

  console.log("--agents--");
  console.log(agents);

  const metric = await Metric.create(agent.uuid, {
    type: "memory",
    value: "300",
  }).catch(handleFatalError);

  console.log("--metric--");
  console.log(metric);

  const metrics = await Metric.findByAgentUuid(agent.uuid).catch(
    handleFatalError
  );
  console.log("--metrics--");
  console.log(metrics);

  const metricsType = await Metric.findByTypeAgentUuid(
    "memory",
    agent.uuid
  ).catch(handleFatalError);
  console.log("--Type-metrics--");
  console.log(metricsType);*/
}

function handleFatalError(err) {
  console.error(err.message);
  console.error(err.stack);
  process.exit(1);
}

run();
