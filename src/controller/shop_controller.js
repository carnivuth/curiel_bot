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
  }

  addShopItem(msg, match){

    console.log(msg);
    var response ='';
    const chatId = msg.chat.id;
    this.loadShopList(chatId);
    var itemName = match[1];
    var item = new ShopItem(msg.from.username,itemName)
    if(this.shopList.addShopItem(item)){
      response = "oggetto mancante: " + item.itemName + " aggiunto da @" + item.username;
    }else{
      response = "oggetto gia presente! vai easy"
    }
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

    var itemName = match[1];
    var item = new ShopItem(msg.from.username,itemName)
    this.shopList.removeItem(item)
    response = "mancanze aggiornate!";

    this.bot.sendMessage(chatId, response);
  }

  loadShopList(chatId){

    var file = "shop-"+chatId+".json"

    // create list if empty or load from file
    this.shopList = new ShopList(this.dataFolder,file);
  }

}
