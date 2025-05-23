# Curiel telegram bot

This is a telegram bot for management of common resources inside the home to avoid loosing time and keep track of food storage and washing machine usage, it's one of my best effort project cause i don't have time for this :(

![](./demo.gif)

## Features

The bot main features are shop list management and washer reservations

### Management of shop list

The bot manages a shop list of items to buy, the commands are as follows:

- `/manca <item[,item....]>` - add item to the shopping list (*multiple items are supported*)
- `/preso <item[,item....]>` - remove item from the shopping list (*multiple items are supported*)
- `/mancanze` -  print shopping list


### Washier reservations

The bot manages also washer reservations, the commands are as follows:

- `/lavatrice` - get washing machine's reservation for the next 7 days
- `/prenota <day> <turn>` - make reservation for the washing machine at a specific turn of a day
- `/libera` - delete washing machine reservation
- `/turni` - get washing machine's turn schedule

### Admin commands

There are also admin commands for management of the bot:

- `/admin` - check if current user is the admin bot
- `/commands` - show command list

## Installation

Installation is done trough the docker image, requirements are as follows

- a telegram bot account and token
- a telegram user that will be the admin of the bot (*can run admin commands*)

Using docker compose:

```yaml
services:
  curiel_bot:
    image: carnivuth/curiel_bot:latest
    restart: unless-stopped
    environment:
      TOKEN: "<INSERT TOKEN HERE>"
      ADMIN: "<TELEGRAM USERNAME OF ADMIN USER>"
    volumes:
      - '<PATH TO DATA FOLDER ON DISK>:/var/lib/curiel_bot/'
        # needed for date localization
      - "/etc/localtime:/etc/localtime:ro"
```

## Development documentation

>[!WARNING]
> This documentation is for development only!!!

The bot is developed using [node.js](https://nodejs.org/) and [telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api) library

## Domain model

```mermaid
classDiagram
    PersistentList <|-- ReservationList
    PersistentList <|-- ShopList
    Controller <|-- WasherController
    Controller <|-- AdminController
    Controller <|-- ShopController

    note for PersistentList "Implement persistence\nin json file"
    class PersistentList{
        +saveToJson()
        +LoadFromJson()
    }

    note for Reservation "dataclass for reservations"
    class Reservation{
        +string username
        +date date
        +int turn
    }

    note for ShopItem "dataclass for shop items"
    class ShopItem{
        +string username
        +string itemName
    }

    class ReservationList{
    }
    class ShopList{
    }

    class Controller{
    }
    class WasherController{
    }
    class ShopController{
    }
    class AdminController{
    }
```

## Runtime architecture

At runtime the bot pull messages and process requests based on chat id, different chats can share the bot instance and data are stored based in `chatId` parameter

```mermaid
flowchart TD
subgraph container
direction TB
A[curiel bot]
C[chat-1.json]
D[chat-2.json]
end
B[(telegram api)]
B -- message in chat 1 --> A -- writes in --> C
B -- message in chat 2 --> A -- writes in --> D

```

## Development environment

In order to create a functional development environment to run and test the bot do as follows:

- create a telegram bot and get it's token for development
- clone repo and create a `var` folder
- use the following docker-compose file

```yaml
services:
  curiel_bot:
    build:
      dockerfile: ./Dockerfile
    restart: unless-stopped
    environment:
      TOKEN: "[TELEGRAM DEV BOT TOKEN]"
      ADMIN: "[YOUR TELEGRAM USERNAME]"
    volumes:
      - '/[PATH_TO_CLONED_REPO]/var:/var/lib/curiel_bot'
        # needed for date localization
      - "/etc/timezone:/etc/timezone:ro"
      - "/etc/localtime:/etc/localtime:ro"
    develop:
      watch:
        - path: ./Dockerfile
          action: rebuild
        - path: ./src/
          action: sync+restart
          target: /usr/local/curiel_bot/src
```

To build and rerun the container use the following command:

```bash
docker compose watch
```

It will build the image locally and restart the container in foreground mode
