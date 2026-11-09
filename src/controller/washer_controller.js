const Turns = require("../model/turns.js");
const ReservationList = require("../model/reservation_list.js");
const Reservation = require("../model/reservation.js");
const Controller = require("./controller.js");
const dateutils = require("../lib/dateutils.js");

module.exports = class WasherController extends Controller {

  constructor(bot,dataFolder){
    super(bot)
    this.dataFolder = dataFolder

    // add callbacks for messages
    this.turns = new Turns(this.dataFolder,"turns.json")
    this.reserve = this.reserve.bind(this);
    this.getReservations = this.getReservations.bind(this);
    this.getTurns = this.getTurns.bind(this);

    this.bot.hears(/\/prenota ([a-zA-Zì]+) ([1-5](,[1-5])*)/, (ctx) => {this.reserve(ctx)})
    this.bot.hears(/\/libera ([a-zA-Zì]+) ([1-5])/, (ctx) => {this.removeReservation(ctx)})
    this.bot.hears(/\/lavatrice/, (ctx) => {this.getReservations(ctx)})
    this.bot.hears(/\/turni/, (ctx) => {this.getTurns(ctx)});
  }

  getReservations(ctx){
    console.log(ctx.update.message.text);
    // get chat id for datafile
    const chatId = ctx.update.message.chat.id;
    this.loadReservationList(chatId)

    var response = "PRENOTAZIONI:\n";

    var validReservations = this.reservations.getValidReservations()
    console.log("validReservations: ",validReservations)

    // there are no valid reservations
    if (validReservations.length == 0) {
      response = "non ci sono prenotazioni";
    }else{
      // list reservations to the user
      response = this.reservations.printValidReservations();
    }
    ctx.reply(response);
  }
  removeReservation(ctx){

    var response= '';
    console.log(ctx.update.message.text);
    const chatId = ctx.update.message.chat.id;

    // get data for specific chat
    this.loadReservationList(chatId)

    // parse params
    var dayOfWeek = ctx.match[1];
    var turn = ctx.match[2];
    if (dateutils.getdaynumber(dayOfWeek) == undefined) {
      response = "hai sbagliato il giorno, vai nel gulag";
    }else{

      // parse date in format MM/DD/YYYY
      var date = dateutils.getdatefromweekday(dateutils.getdaynumber(dayOfWeek)).toLocaleString(undefined,{  year: "numeric", month: "2-digit", day: "2-digit", });

      // create reservation
      var reservation = new Reservation(ctx.update.message.from.username,date,turn)
      console.log("reservation to be removed: ",reservation)

      // add reservation and setup response
      if(this.reservations.removeReservation(reservation)){
        console.log("reservation removed: ",reservation)
        response ="turno: " + reservation.turn + " del giorno: " + reservation.date + " prenotato  da @" + reservation.username +" è stato liberato";
      }else{
        response = "il turno non era tuo o non esisteva, vai nel gulag";
      }
    }


    ctx.reply(response);

  }

  reserve(ctx) {

    var response= '';
    console.log(ctx.update.message.text);
    const chatId = ctx.update.message.chat.id;

    // get data for specific chat
    this.loadReservationList(chatId)

    // parse params
    var dayOfWeek = ctx.match[1];
    var turns = ctx.match[2].split(',');
    if (dateutils.getdaynumber(dayOfWeek) == undefined) {
      response = "hai sbagliato il giorno, vai nel gulag";
    }else{

      // parse date in format MM/DD/YYYY
      var date = dateutils.getdatefromweekday(dateutils.getdaynumber(dayOfWeek)).toLocaleString(undefined,{  year: "numeric", month: "2-digit", day: "2-digit", });

      // create reservation
      turns.forEach((turn) =>{
        var reservation = new Reservation(ctx.update.message.from.username,date,turn)
        console.log("reservation to be added: ",reservation)

        // add reservation and setup response
        if(this.reservations.addReservation(reservation)){
          console.log("reservation added: ",reservation)
          response +="turno: " + reservation.turn + " del giorno: " + reservation.date + " assegnato a @" + reservation.username+ "\n";
        }else{
          response +="turno: " + reservation.turn + " del giorno: " + reservation.date + " gia preso, vai nel gulag\n";
        }
      })
    }
    ctx.reply(response);
  }


  getTurns(ctx){
    console.log(ctx.update.message.text);
    var response = "TURNI:\n";
    const chatId = ctx.update.message.chat.id;

    response += this.turns.printTurns()
    ctx.reply(response);
  }

  loadReservationList(chatId){

    var file = "reservations-"+chatId+".json"

    // create list if empty or load from file
    this.reservations = new ReservationList(this.dataFolder,file);
  }

}
