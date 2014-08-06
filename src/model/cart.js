function Cart(scanedInfos){
    var customItem;
    var customItemList = [];
    _.forEach(scanedInfos, function(scanedInfo) {
          var item = _.find(loadAllItems(), {'barcode': scanedInfo.barcode});

          var customPromotion = new CustPro('no',0);
          _.each(loadPromotions(), function(promotion) {
              _.each(promotion.barcodes,function(barcode){
                if(barcode === scanedInfo.barcode){
                  customPromotion = new CustPro(promotion.type, parseInt(scanedInfo.num/3));
                  }
              })
          })
          customItem = new CustItem(item, scanedInfo.num, customPromotion);
          customItemList.push(customItem);
      });
    this.customItemList = customItemList;
}

Cart.prototype.getCustItemList = function (){
    return this.customItemList;
};
