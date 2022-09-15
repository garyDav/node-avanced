[api, mqtt, web]: npm run start-dev
ports:
5432: postgres
5050: pgadmin4
3000: api
6379: Redis
1883: mqtt
8080: web

habilitar puertos: `sudo ufw allow 1883/tcp`
ejecutar agente: `node examples/index.js`
ejectuar node-cli: `node platziverse.js`