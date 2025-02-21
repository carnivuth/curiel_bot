#!/bin/bash
if [[ ! -f "$DATA_FOLDER/turns.json" ]]; then
  echo "setting default turns"
  cp "$CONF_FOLDER/turns.json" "$DATA_FOLDER/turns.json";
fi

if [[ ! -f "$DATA_FOLDER/commands.json" ]]; then
  echo "setting default command list"
  cp "$CONF_FOLDER/commands.json" "$DATA_FOLDER/commands.json";
fi

node index.js
