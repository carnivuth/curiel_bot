# CURIEL_BOT
- bot for home management

## INSTALLATION
- clone repository
- run  `npm install`
- create `data` directory under `repository/path`
- copy `.env.example` in `.env`
- set variables on `.env` file
- run with  `npm start`

## RUN ON DOCKER CONTAINER 

```bash
docker run -it --mount type=bind,source=<path/to/.env>,target=/usr/src/curiel_bot/.env --mount type=bind,source=<path/to/data/folder>,target=/usr/src/curiel_bot/data --name cb carnivuth/curiel_bot:latest 
```

for more informations check [docker deployment](./notes/pages/DOCKER%20DEPLOYMENT.md)