"use strict";

const config = (setup, debug) => {
  return {
    db: {
      database: process.env.DB_NAME || "db_donbosco",
      username: process.env.DB_USER || "dbuser",
      password: process.env.DB_PASS || "dbpass",
      host: process.env.DB_HOST || "localhost",
      dialect: "postgres",
      logging: (s) => debug(s),
      setup,
    },
    auth: {
      secret: process.env.SECRET || "platzi",
      algorithms: ["HS256"],
    },
  };
};

module.exports = config;
