const path = require("path");
const fs = require("fs");
module.exports = persistance = {
  loadFromJson: function (file) {
    return JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, "../../" + process.env.DATA_FOLDER + "/" + file)
      )
    );
  },
  loadSettings: function (file) {
    return JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, "../../" + process.env.SETTINGS_FOLDER + "/" + file)
      )
    );
  },
  saveToJson: function (file, object) {
    fs.writeFileSync(
      path.resolve(__dirname, "../../" + process.env.DATA_FOLDER + "/" + file),
      JSON.stringify(object)
    );
  },
};
