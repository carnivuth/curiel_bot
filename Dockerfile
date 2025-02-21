FROM node:latest
# create data folder and seed initial data
ENV DATA_FOLDER=/var/lib/curiel_bot
ENV CONF_FOLDER=/etc/curiel_bot
RUN mkdir -p $DATA_FOLDER $CONF_FOLDER

COPY ./etc/commands.json $CONF_FOLDER/commands.json
COPY ./etc/turns.json $CONF_FOLDER/turns.json

# install sources
WORKDIR /usr/local/curiel_bot
COPY ./index.js .
COPY ./package.json .
COPY ./package-lock.json .
COPY ./readme.md .
ADD ./src ./src
RUN npm install

# added entrypoint to setup default configs in data folder if absent
COPY ./entrypoint.sh .

CMD ["/bin/bash","./entrypoint.sh"]
