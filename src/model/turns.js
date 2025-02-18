const PersistentList = require("./persistent_list.js");
// class for turns
module.exports = class Turns extends PersistentList{

  // filename, name of the file where to store json data
  // filepath, path to data folder
  constructor(filepath,filename){
    super(filepath,filename)
  }
  printTurns(){
    var result = ''
    this.list.forEach((turn) => {
      result +=
      "TURNO" +
        turn.turn +
        " ➡️ " +
        turn.range +
        "\n";
    });
    return result
  }

}
