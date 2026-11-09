const Controller = require("./controller.js");
const PersistentList = require("../model/persistent_list.js");

module.exports = class adminController extends Controller {

  constructor(bot,dataFolder,admin){
    super(bot)
    this.dataFolder = dataFolder
    this.commands = new  PersistentList(this.dataFolder,"commands.json");
    this.admin = admin

    this.isAdmin = this.isAdmin.bind(this);
    this.getCommands = this.getCommands.bind(this);
    this.bot.hears(/\/admin/, (ctx) => {this.isAdmin(ctx)})
    this.bot.hears(/\/commands/, (ctx) => {this.getCommands(ctx)})
  }
  isAdmin(ctx){
    console.log(ctx.update.message.text);
    var response ='';
    const chatId = ctx.update.message.chat.id;

    if(this.admin !== ctx.update.message.from.username){
      response = "non hai il consenso del partito per lanciare questo comando";
    }else{
      response = "sei il capo supremo del partito";
    }
    ctx.reply(response);
  }

  getCommands(ctx){
    console.log(ctx.update.message.text);
    var response ='';
    const chatId = ctx.update.message.chat.id;

    if(this.admin !== ctx.update.message.from.username){
      response = "non hai il consenso del partito per lanciare questo comando";
    }else{
      this.commands.list.forEach((command)  => {
        response += command.command + " - " + command.description+ "\n"
      });
    }
    ctx.reply(response);
  }
}
