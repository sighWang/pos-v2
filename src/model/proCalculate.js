function ProCalculate (){
    this.promotions = loadPromotions();
}
ProCalculate.prototype.getCustProBySinfo =function(barcAndNum){
    var promotionInfo;
    promotions = loadPromotions();;

    for (var i = 0; i < promotions.length; i++){
      for(var j = 0; j < promotions[i].barcodes.length; j++){
        if(promotions[i].barcodes[j] === barcAndNum.barcode && promotions[i].type === 'BUY_TWO_GET_ONE_FREE'){
          promotionInfo = new CustPro(promotions[i].type, parseInt(barcAndNum.num / 3));
          break;
        }
       else{
         promotionInfo = new CustPro('no', 0);
       }
     }
  }
  return promotionInfo;
}
