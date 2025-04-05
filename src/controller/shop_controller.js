const ShopList = require("../model/shop_list.js");
const ShopItem = require("../model/shop_item.js");
const Controller = require("./controller.js");

module.exports = class ShopController extends Controller {

  constructor(bot,dataFolder){
    super(bot)
    this.dataFolder = dataFolder

    // add callbacks for messages
    this.addShopItem = this.addShopItem.bind(this);
    this.getShopList = this.getShopList.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.bot.onText(/\/manca (.+)/, (msg, match) => {this.addShopItem(msg,match)})
    this.bot.onText(/\/mancanze/, (msg, match) => {this.getShopList(msg,match)})
    this.bot.onText(/\/preso (.+)/, (msg, match) => { this.removeItem(msg,match)})
    this.bot.onText(/\/presotutto/, (msg, match) => {this.clearShopList(msg,match)})
  }

  addShopItem(msg, match){

    console.log(msg);
    var response ='';
    const chatId = msg.chat.id;
    this.loadShopList(chatId);
    var itemsNames = match[1].split(',');

    itemsNames.forEach((itemName) =>{

      var item = new ShopItem(msg.from.username,itemName.trim())
      if(this.shopList.addShopItem(item)){
        response += "oggetto mancante: " + item.itemName + " aggiunto da @" + item.username + "\n";
      }else{
        response += "oggetto " + item.itemName + "gia presente in lista! vai easy \n"
      }

    })
    this.bot.sendMessage(chatId, response);
  }

  getShopList(msg,match) {
    console.log(msg);
    var response = ''
    const chatId = msg.chat.id;
    this.loadShopList(chatId);

    if (this.shopList.list.length == 0) {
      response = "non manca niente";
    }else{
      response = this.shopList.printShopList()
    }
    this.bot.sendMessage(chatId, response);
  }

  removeItem(msg, match){
    console.log(msg);
    var response;
    const chatId = msg.chat.id;
    this.loadShopList(chatId);

    var itemsNames = match[1].split(',');

    itemsNames.forEach((itemName) =>{

      var item = new ShopItem(msg.from.username,itemName.trim())
      this.shopList.removeItem(item)

    })
    response = "mancanze aggiornate\n " + this.shopList.printShopList();

    this.bot.sendMessage(chatId, response);
  }

  clearShopList(msg, match){
    console.log(msg);
    var response;
    const chatId = msg.chat.id;
    this.loadShopList(chatId);

    this.shopList.clear()
    response = "la lista della spesa e stata svuotata!";

    this.bot.sendMessage(chatId, response);
  }

  loadShopList(chatId){

    var file = "shop-"+chatId+".json"

    // create list if empty or load from file
    this.shopList = new ShopList(this.dataFolder,file);
  }

}
