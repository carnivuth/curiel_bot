FROM node:24.10.0-trixie-slim AS deps
# create data folder and seed initial data
ENV DATA_FOLDER=/var/lib/curiel_bot
ENV CONF_FOLDER=/etc/curiel_bot
ENV CURIEL_BOT_VERSION=$CURIEL_BOT_VERSION
RUN mkdir -p $DATA_FOLDER $CONF_FOLDER

COPY ./etc/commands.json $CONF_FOLDER/commands.json
COPY ./etc/turns.json $CONF_FOLDER/turns.json

WORKDIR /usr/local/curiel_bot
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install


FROM deps AS curiel_bot
WORKDIR /usr/local/curiel_bot
COPY ./index.js .
COPY ./readme.md .
ADD ./src ./src

COPY ./entrypoint.sh .
CMD ["/bin/bash","./entrypoint.sh"]
