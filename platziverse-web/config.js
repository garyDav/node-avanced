"use strict";

require("dotenv").config();

module.exports = {
  endpoint: process.env.API_ENDPOINT || "http://192.168.0.150:3000",
  serverHost: process.env.SERVER_HOST || "http://192.168.0.150:8080",
  apiToken:
    process.env.API_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBsYXR6aSIsImFkbWluIjp0cnVlLCJwZXJtaXNzaW9ucyI6WyJtZXRyaWNzOnJlYWQiXSwiaWF0IjoxNjMzOTg5NjY3fQ.z0x2j3QygZFgJnGSGp4PQQqUftQ_dYb6HscdhYps9U0",
};
