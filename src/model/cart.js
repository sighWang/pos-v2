function Cart(scanedInfos){
    var custItem;
    var custItemList = [];
    _.forEach(scanedInfos, function(scanedInfo) {
         var item = _.find(loadAllItems(), {'barcode': scanedInfo.barcode});
         var custPro;
         _.forEach(loadPromotions(), function(promotion) {
           //need to do
             if(_.indexOf(promotion.barcodes, scanedInfo.barcode)){
               if(promotion.type === 'BUY_TWO_GET_ONE_FREE'){
                 custPro = new CustPro(promotion.type, scanedInfo.num | 0);
               }
             };
         });
         custItem = new CustItem(item, scanedInfo.num, custPro);
         custItemList.push(custItem);
      });
    this.custItemList = custItemList;
}
Cart.prototype.getCustItemList = function (){
    return this.custItemList;
}
