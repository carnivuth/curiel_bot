FROM node:latest
WORKDIR /usr/src/curiel_bot
COPY . .
RUN npm install
CMD ["node", "index.js"] 
