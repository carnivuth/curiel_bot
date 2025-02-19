#!/bin/bash
if [[ ! -f "$DATA_FOLDER/turns.json" ]]; then
  echo "setting default turns"
  cp "$CONF_FOLDER/turns.json" "$DATA_FOLDER/turns.json";
fi

if [[ ! -f "$DATA_FOLDER/command-list.txt" ]]; then
  echo "setting default command list"
  cp "$CONF_FOLDER/command-list.txt" "$DATA_FOLDER/command-list.txt";
fi

node index.js
