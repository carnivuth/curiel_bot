module.exports= function admin(bot){
    bot.onText(/\/admin/, (msg, match) => {
        console.log(msg);
        var resp;
        const chatId = msg.chat.id;
      
        if(!Admin(msg.from.username)){
          resp = "non hai il consenso del partito per lanciare questo comando";
          console.log(resp);  
          bot.sendMessage(chatId, resp);
          return;
        }
        
      
      
      
        resp = "sei il capo supremo del partito";
        console.log(resp);
      
        bot.sendMessage(chatId, resp);
      });
}
function Admin(username){
    return username==process.env.ADMIN;
  }