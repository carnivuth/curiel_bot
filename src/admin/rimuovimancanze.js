const percistance = require('../common/percistance');

require('../common/percistance')
module.exports= function rimuovimancanze(bot){
    bot.onText(/\/rimuovimancanze/, (msg, match) => {
        console.log(msg);
        var resp;
        const chatId = msg.chat.id;
      
        if(!Admin(msg.from.username)){
          resp = "non hai il consenso del partito per lanciare questo comando";
          console.log(resp);  
          bot.sendMessage(chatId, resp);
          return;
        }
        percistance.saveToJson('mancanze-'+chatId+'.json',[])
        resp = "rimosse tutte le mancanze!";
        console.log(resp);
      
        bot.sendMessage(chatId, resp);
      });
}
function Admin(username){
    return username==process.env.ADMIN;
  }