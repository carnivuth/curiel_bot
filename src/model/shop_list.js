const PersistentList = require("./persistent_list.js");
// class for shoplist
module.exports = class ShopList extends PersistentList{

  // filename, name of the file where to store json data
  // filepath, path to data folder
  constructor(filename,filepath){
    super(filename,filepath)
  }

  addShopItem(item){

    var filteredShopList=this.list.filter(function (shopItem) {
      return shopItem.itemName == item.itemName;
    });

    if(filteredShopList.length== 0){
      this.list.push(item)
      this.saveToJson()
      return true
    }else{
      return false
    }

  }
  printShopList(){

    var result = "in casa manca:\n";
    this.list.forEach((item) => {
      result += item.itemName + "\n";
    })
    return result

  }
  removeItem(item){

      this.list = this.list.filter(function (shopItem) {
        return !item.itemName.includes(shopItem.itemName);
      });
    this.saveToJson()
  }
}
