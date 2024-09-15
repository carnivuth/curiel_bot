FROM node:latest
# create data folder and seed initial data
ENV DATA_FOLDER=/var/lib/curiel_bot
RUN mkdir -p $DATA_FOLDER/data
COPY command-list.txt $DATA_FOLDER/command-list.txt
COPY turns.json $DATA_FOLDER/turns.json
# install sources
WORKDIR /usr/local/curiel_bot
COPY . .
RUN npm install
CMD ["node", "index.js"]
