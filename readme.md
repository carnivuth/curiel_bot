# CURIEL_BOT

This is a telegram bot for management of common resources inside the home to avoid loosing time and keep track of food storage and washing machine usage, it's one of my best effort project cause i don't have time for this :(

## FEATURES

Possible commands are described in the  [command list](./command-list.txt) here a quick reference

- `/lavatrice` - get washing machine's reservation for the next 7 days
- `/prenota <day> <turn>` - make reservation for the washing machine at a specific turn of a day
- `/libera` - delete washing machine reservation #TODO
- `/turni` - get washing machine's turn schedule
- `/manca <item>` - add item to the shopping list
- `/preso <item>` - remove item from the shopping list
- `/mancanze` -  print shopping list
- `/admin` - check if current user is the admin bot
- `/rimuovimancanze` - remove all elements from shopping list
- `/help` - show help command

## DOCKER INSTALLATION

refer to the [docker-compose example](./docker-compose.yml.sample) file in the repo
