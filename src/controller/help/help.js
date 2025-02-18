const fs = require('node:fs');
module.exports=function help(bot){
    bot.onText(/\/help.*/, (msg, match) => {
        console.log(msg);
        var resp;
        const chatId = msg.chat.id;
        fs.readFile('/var/lib/curiel_bot/command-list.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        bot.sendMessage(chatId, data);
        console.log(msg);
      });

      });
}
