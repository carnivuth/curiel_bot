const Controller = require("./controller.js");

module.exports = class adminController extends Controller {

  constructor(bot,dataFolder,admin){
    super(bot)
    this.dataFolder = dataFolder
    this.admin = admin

    this.isAdmin = this.isAdmin.bind(this);
    this.bot.onText(/\/admin/, (msg, match) => {this.isAdmin(msg,match)})
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
}
