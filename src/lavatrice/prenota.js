module.exports=function prenota(bot){
    bot.onText(/\/prenota/, (msg, match) => {
        console.log(msg);
      
        const chatId = msg.chat.id;
        const resp = "Aspetta, non l'ho ancora fatto il codice";
      
        bot.sendMessage(chatId, resp);
      });
}