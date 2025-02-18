percistance=require("../common/percistance")
module.exports=function preso(bot){
  bot.onText(/\/preso (.+)/, (msg, match) => {
    console.log(msg);
    var resp;
    const chatId = msg.chat.id;

    //objectsTaken = match[1].split(" ");
    objectsTaken = match[1];
    if (objectsTaken == 'tutto'){
      percistance.saveToJson("mancanze-"+chatId+".json", []);
    }else{

      mancanze = percistance.loadFromJson("mancanze-"+chatId+".json");
      console.log(mancanze);
      mancanze = mancanze.filter(function (item) {
        return !objectsTaken.includes(item.mancanza);
      });

      percistance.saveToJson("mancanze-"+chatId+".json", mancanze);
    }

    resp = "mancanze aggiornate!";
    console.log(resp);

    bot.sendMessage(chatId, resp);
  });
}
