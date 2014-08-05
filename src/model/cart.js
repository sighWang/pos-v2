function Cart(scanedInfo){
    var custItem;
    var custItemList = [];
    for (var i in scanedInfo){
      var item = this.getCustItemByBarc(scanedInfo[i].barcode);
      var promotion = new ProCalculate();
      var custPro = promotion.getCustProBySinfo(scanedInfo[i]);
      custItem = new CustItem(item, scanedInfo[i].num, custPro);
      custItemList.push(custItem);
    }
    this.custItemList = custItemList;
}
Cart.prototype.getCustItemByBarc = function (barcode){
        allItems = loadAllItems();
        for (var i = 0; i<allItems.length; i++){
          if(allItems[i].barcode === barcode){
            return allItems[i];
        }
    }
 }
Cart.prototype.getCustItemList = function (){
    return this.custItemList;
}
