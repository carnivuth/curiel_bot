# CURIEL_BOT
- telegram bot for home management

## INSTALLATION

### DOCKER COMPOSE

insert this in `docker-compose.yml`
```docker-compose
services:
  curiel_bot:
    image: carnivuth/curiel_bot:latest
    restart: unless-stopped
    environment:
      TOKEN: "<INSERT TELEGRAM TOKEN>"
      SETTINGS_FOLDER: settings
      DATA_FOLDER: data
      ADMIN: "<INSERT TELEGRAM ADMIN USERNAME"
    volumes:
      - '<PATH TO BOT DATA FOLDER>:/usr/src/curiel_bot/data'
```

### FROM SOURCES

- clone repository
- run  `npm install`
- create `data` directory
- copy `.env.example` in `.env`
- set variables on `.env` file
- run with  `npm start`
