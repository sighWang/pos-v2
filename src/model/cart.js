function Cart(scanedInfos){
    var customItem;
    var customItemList = [];
    _.forEach(scanedInfos, function(scanedInfo) {
         var item = _.find(loadAllItems(), {'barcode': scanedInfo.barcode});
         var customPromotion;
         _.forEach(loadPromotions(), function(promotion) {
             if(_.indexOf(promotion.barcodes, scanedInfo.barcode)){
               if(promotion.type === 'BUY_TWO_GET_ONE_FREE'){
                 custonPromotion = new CustPro(promotion.type, scanedInfo.num | 0);
               }
             };
         });
         customItem = new CustItem(item, scanedInfo.num, custonPromotion);
         customItemList.push(customItem);
      });
    this.customItemList = customItemList;
}
Cart.prototype.getCustItemList = function (){
    return this.customItemList;
}
