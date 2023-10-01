percistance=require("../common/percistance")
module.exports=function preso(bot){
    bot.onText(/\/preso (.+)/, (msg, match) => {
        console.log(msg);
        var resp;
        const chatId = msg.chat.id;
      
        oggettoPreso = match[1];
      
        mancanze = percistance.loadFromJson("mancanze.json");
        console.log(mancanze);
        mancanze = mancanze.filter(function (item) {
          return item.mancanza !== oggettoPreso;
        });
      
        percistance.saveToJson("mancanze.json", mancanze);
      
        resp = "mancanze aggiornate!";
        console.log(resp);
      
        bot.sendMessage(chatId, resp);
      });
}