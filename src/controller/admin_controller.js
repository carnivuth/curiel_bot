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
    this.bot.onText(/\/admin/, (msg, match) => {this.isAdmin(msg,match)})
    this.bot.onText(/\/commands/, (msg, match) => {this.getCommands(msg,match)})
  }
  isAdmin(msg,match){
    console.log(msg);
    var response ='';
    const chatId = msg.chat.id;

    if(this.admin !== msg.from.username){
      response = "non hai il consenso del partito per lanciare questo comando";
    }else{
      response = "sei il capo supremo del partito";
    }
    this.bot.sendMessage(chatId, response);
  }

  getCommands(msg,match){
    console.log(msg);
    var response ='';
    const chatId = msg.chat.id;

    if(this.admin !== msg.from.username){
      response = "non hai il consenso del partito per lanciare questo comando";
    }else{
      this.commands.list.forEach((command)  => {
        response += command.command + " - " + command.description+ "\n"
      });
    }
    this.bot.sendMessage(chatId, response);
  }
}
