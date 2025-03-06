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

    this.bot.onText(/\/prenota ([a-zA-Zì]+) ([1-5])/, (msg,match) => {this.reserve(msg,match)})
    this.bot.onText(/\/libera ([a-zA-Zì]+) ([1-5])/, (msg,match) => {this.removeReservation(msg,match)})
    this.bot.onText(/\/lavatrice/, (msg,match) => {this.getReservations(msg,match)})
    this.bot.onText(/\/turni/, (msg, match) => {this.getTurns(msg,match)});
  }

  getReservations(msg, match){
    console.log(msg);
    // get chat id for datafile
    const chatId = msg.chat.id;
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
    this.bot.sendMessage(chatId, response);
  }
  removeReservation(msg,match){

    var response= '';
    console.log(msg);
    const chatId = msg.chat.id;

    // get data for specific chat
    this.loadReservationList(chatId)

    // parse params
    var dayOfWeek = match[1];
    var turn = match[2];
    if (dateutils.getdaynumber(dayOfWeek) == undefined) {
      response = "hai sbagliato il giorno, vai nel gulag";
    }else{

      // parse date in format MM/DD/YYYY
      var date = dateutils.getdatefromweekday(dateutils.getdaynumber(dayOfWeek)).toLocaleString(undefined,{  year: "numeric", month: "2-digit", day: "2-digit", });

      // create reservation
      var reservation = new Reservation(msg.from.username,date,turn)
      console.log("reservation to be removed: ",reservation)

      // add reservation and setup response
      if(this.reservations.removeReservation(reservation)){
        console.log("reservation removed: ",reservation)
        response ="turno: " + reservation.turn + " del giorno: " + reservation.date + " prenotato  da @" + reservation.username +" e stato liberato";
      }else{
        response = "il turno non era tuo o non esisteva, vai nel gulag";
      }
    }


    this.bot.sendMessage(chatId, response);

  }

  reserve(msg,match) {

    var response= '';
    console.log(msg);
    const chatId = msg.chat.id;

    // get data for specific chat
    this.loadReservationList(chatId)

    // parse params
    var dayOfWeek = match[1];
    var turn = match[2];
    if (dateutils.getdaynumber(dayOfWeek) == undefined) {
      response = "hai sbagliato il giorno, vai nel gulag";
    }else{

      // parse date in format MM/DD/YYYY
      var date = dateutils.getdatefromweekday(dateutils.getdaynumber(dayOfWeek)).toLocaleString(undefined,{  year: "numeric", month: "2-digit", day: "2-digit", });

      // create reservation
      var reservation = new Reservation(msg.from.username,date,turn)
      console.log("reservation to be added: ",reservation)

      // add reservation and setup response
      if(this.reservations.addReservation(reservation)){
        console.log("reservation added: ",reservation)
        response ="turno: " + reservation.turn + " del giorno: " + reservation.date + " assegnato a @" + reservation.username;
      }else{
        response = "turno gia preso, vai nel gulag";
      }

    }
    this.bot.sendMessage(chatId, response);
  }


  getTurns(msg,match){
    console.log(msg);
    var response = "TURNI:\n";
    const chatId = msg.chat.id;

    response += this.turns.printTurns()
    this.bot.sendMessage(chatId, response);
  }

  loadReservationList(chatId){

    var file = "reservations-"+chatId+".json"

    // create list if empty or load from file
    this.reservations = new ReservationList(this.dataFolder,file);
  }

}
