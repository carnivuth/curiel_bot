FROM node:latest
WORKDIR /usr/src/curiel_bot
COPY package.json .
RUN npm install
COPY . .
RUN ./install.sh
CMD [ "npm", "start" ]