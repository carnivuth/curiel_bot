FROM node:latest
WORKDIR /usr/src/curiel_bot
COPY . .
COPY command-list.txt /var/lib/curiel_bot/command-list.txt
RUN npm install
CMD ["node", "index.js"]
