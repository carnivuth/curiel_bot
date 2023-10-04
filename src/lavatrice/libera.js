module.exports=function libera(bot){
    bot.onText(/\/libera ([a-zA-Z]+) (1|2|3|4)/, (msg, match) => {
        console.log(msg);
      
        const chatId = msg.chat.id;
        const resp = "Aspetta, non l'ho ancora fatto il codice";
      
        bot.sendMessage(chatId, resp);
      });
}