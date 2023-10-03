percistance=require("../common/percistance")
const crypto=require("crypto")
module.exports=function manca(bot){bot.onText(/\/manca (.+)/, (msg, match) => {
    console.log(msg);
    var resp;
    const chatId = msg.chat.id;
  
    oggettoMancante = match[1];
  
    mancanze = percistance.loadFromJson("mancanze.json");
    console.log(mancanze);
  
    UUID = crypto.randomUUID();
    console.log(UUID);
    //check for 
    mancanze.filter(function (item) {
      return item.mancanza === oggettoMancante;
    });

    if(mancanze.length== 0){
      mancanze.push({
        username: msg.from.username,
        mancanza: oggettoMancante,
        UUID: UUID,
      });
      percistance.saveToJson("mancanze.json", mancanze);
  
    resp =
      "oggetto mancante: " +
      oggettoMancante +
      " aggiunto da @" +
      msg.from.username;
    }else{
      resp =
      "oggetto gia presente! vai easy" 
    }
   
    
    bot.sendMessage(chatId, resp);
  });
  }