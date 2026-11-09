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

    this.bot.hears(/\/manca (.+)/, (ctx) => {this.addShopItem(ctx)})
    this.bot.hears(/\/mancanze/, (ctx) => {this.getShopList(ctx)})
    this.bot.hears(/\/preso (.+)/, (ctx) => { this.removeItem(ctx)})
    this.bot.hears(/\/presotutto/, (ctx) => {this.clearShopList(ctx)})
  }

  addShopItem(ctx){

    console.log(ctx.update.message.text);
    var response ='';
    const chatId = ctx.update.message.chat.id;
    this.loadShopList(chatId);
    var itemsNames = ctx.match[1].split(',');

    itemsNames.forEach((itemName) =>{

      var item = new ShopItem(ctx.message.from.username,itemName.trim())
      if(this.shopList.addShopItem(item)){
        response += "oggetto mancante: " + item.itemName + " aggiunto da @" + item.username + "\n";
      }else{
        response += "oggetto " + item.itemName + "gia presente in lista! vai easy \n"
      }

    })
    ctx.reply(response);
  }

  getShopList(ctx) {
    console.log(ctx.update.message.text);
    var response = ''
    const chatId = ctx.update.message.chat.id;
    this.loadShopList(chatId);

    if (this.shopList.list.length == 0) {
      response = "non manca niente";
    }else{
      response = this.shopList.printShopList()
    }
    ctx.reply(response);
  }

  removeItem(ctx){
    console.log(ctx.update.message.text);
    var response;
    const chatId = ctx.update.message.chat.id;
    this.loadShopList(chatId);

    var itemsNames = ctx.match[1].split(',');

    itemsNames.forEach((itemName) =>{

      var item = new ShopItem(ctx.update.message.from.username,itemName.trim())
      this.shopList.removeItem(item)

    })
    response = "mancanze aggiornate\n " + this.shopList.printShopList();

    ctx.reply(response);
  }

  clearShopList(ctx){
    console.log(ctx.update.message.text);
    var response;
    const chatId = ctx.update.message.chat.id;
    this.loadShopList(chatId);

    this.shopList.clear()
    response = "la lista della spesa è stata svuotata!";

    ctx.reply(response);
  }

  loadShopList(chatId){

    var file = "shop-"+chatId+".json"

    // create list if empty or load from file
    this.shopList = new ShopList(this.dataFolder,file);
  }

}
