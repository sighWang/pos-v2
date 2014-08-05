function Cart(scanedInfos){
    var custItem;
    var custItemList = [];
    _.forEach(scanedInfos, function(scanedInfo) {
         var item = _.find(loadAllItems(), {'barcode': scanedInfo.barcode});
         var custPro = _.find(loadPromotions(), {'barcode': scanedInfo.barcode});
         console.log('custPro'+custPro);
         custItem = new CustItem(item, scanedInfo.num, custPro);
         custItemList.push(custItem);
      });
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
