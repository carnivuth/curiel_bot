const path = require("path");
const fs = require("fs");

// class for object persistance
module.exports = class PersistentList{

  // filename, name of the file where to store json data
  // filepath, path to data folder
  constructor(filepath,filename){
    this.filename = filename
    this.filepath = filepath
    this.list = []

    // create file if not exists or load existent file
    try {
      if (! fs.existsSync(path.resolve( this.filepath + "/" + this.filename))) {
        this.saveToJson()
      }else{
        this.loadFromJson()
      }
    } catch(err) { console.error(err) }
  }

  saveToJson() {
    console.log("saving list "+ this.filepath + "/" + this.filename)
    fs.writeFileSync(path.resolve(this.filepath + "/" + this.filename), JSON.stringify(this.list));
  }

  loadFromJson() {
    console.log("loading list "+ this.filepath + "/" + this.filename)
    this.list  = JSON.parse(fs.readFileSync(path.resolve( this.filepath + "/" + this.filename)));
  }

}
