const PersistentList = require("./persistent_list.js");
// class for reservation list
module.exports = class ReservationList extends PersistentList{

  // filename, name of the file where to store json data
  // filepath, path to data folder
  constructor(filepath,filename){
    super(filepath,filename)
  }

  // filters reservations by date
  getValidReservations(){

    // compute date and yesterday date filtering list
    var yesterday= new Date()
    yesterday.setDate(new Date().getDate()-1)

    var validReservations = this.list.filter(function (reservation) {
      return new Date(reservation.date).getTime() >  yesterday.getTime();
    });

    return validReservations
  }

  removeReservation(reservation){

    // filter reservations to search for same date and time
    var reservationRemovedList = this.getValidReservations().filter(function (r) {
      return r.date != reservation.date || r.turn != reservation.turn || r.username != reservation.username;
    });
    console.log(reservationRemovedList)

    if (reservationRemovedList.length != this.list.length ) {

      this.list = reservationRemovedList
      this.saveToJson()
      return true
    }
    return false
  }
  printValidReservations(){
    var result= ''
      this.getValidReservations().forEach((reservation) => {
        result += "@" + reservation.username + " ha prenotato " + new Date(reservation.date).toLocaleDateString() + " il turno " + reservation.turn + "\n";
      });
  return result
  }
  addReservation(reservation){

    // filter reservations to search for same date and time
    var validReservationsFiltered = this.getValidReservations().filter(function (r) {
      return r.date == reservation.date && r.turn == reservation.turn;
    });

    if (validReservationsFiltered.length == 0) {
      this.list.push(reservation)
      this.saveToJson()
      return true
    }
    return false
  }
  printValidReservations(){
    var result= ''
      this.getValidReservations().forEach((reservation) => {
        result += "@" + reservation.username + " ha prenotato " + new Date(reservation.date).toLocaleDateString() + " il turno " + reservation.turn + "\n";
      });
  return result
  }
}
