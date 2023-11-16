the application is developed with docker container as the principle option for deployment

there is a [ci/cd pipeline](CI-CD%20PIPELINE.md) for updating the image in [docker hub](https://hub.docker.com) with tag `carnivuth/curiel_bot:latest`

the command to create the container is as follow:

```bash 
docker run -it --mount type=bind,source=<path/to/.env>,target=/usr/src/curiel_bot/.env --mount type=bind,source=<path/to/data/folder>,target=/usr/src/curiel_bot/data --name cb carnivuth/curiel_bot:latest
```

where :

- `<path/to/data/folder>` is the folder where the bot stores data, it must be named `data`

- `<path/to/.env>` is the .env file with the variables needed for the bot to work , an example is present in the [repository](https://github.com/carnivuth/curiel_bot/blob/main/.env.example)
