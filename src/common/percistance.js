const path = require("path");
const fs = require("fs");
module.exports = persistance = {
//prova
  loadFromJson: function (file) {
    try {
      if (! fs.existsSync(path.resolve( process.env.DATA_FOLDER + "/" + file))) {
        this.saveToJson(file,[])
      }
    } catch(err) {
      console.error(err)
    }
    return JSON.parse(
      fs.readFileSync(
        path.resolve( process.env.DATA_FOLDER + "/" + file)
      )
    );
  },
  saveToJson: function (file, object) {
    fs.writeFileSync(
      path.resolve( process.env.DATA_FOLDER + "/" + file),
      JSON.stringify(object)
    );
  },
};
