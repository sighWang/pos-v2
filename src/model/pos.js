function Pos(){
    this.scanner = new Scanner();
}
Pos.prototype.getShoppingList = function (inputs){

    var barcodeCountList = this.scanner.scanInputs(inputs);
    this.cart = new Cart(barcodeCountList);
    var customItemList = this.cart.getCustItemList(barcodeCountList);
    var shoppingList = this.createShoppingList(customItemList);

    return shoppingList;

}
Pos.prototype.createShoppingList = function (customItemList){

    var shoppingList = '***<没钱赚商店>购物清单***\n' +
    '打印时间：' + Utils.formatter.getCurrentFormatTime() + '\n' ;
    var customList = this.getCustomList(customItemList);
    var freeList = this.getFreeList(customItemList);
    var subtotalAndSave = this.getSubtotalAndSave(customItemList);
    return shoppingList + customList + freeList + subtotalAndSave;
}
Pos.prototype.getFreeList = function (customItemList){
    var freeList = '挥泪赠送商品：\n';
    for(var i= 0; i < customItemList.length; i++){
      if(customItemList[i].promotion.type === 'BUY_TWO_GET_ONE_FREE')
      freeList += '名称：' + customItemList[i].item.name +
      '，数量：' + customItemList[i].promotion.num + customItemList[i].item.unit + '\n';
    }
    return freeList;
}
Pos.prototype.getTotal = function(customItem){
    var total = customItem.item.price * (customItem.num - customItem.promotion.num);
    return Utils.formatter.formatPrice(total);
}
Pos.prototype.getSubtotalAndSave = function (customItemList){
    var subtotal = 0;
    var saveUp = 0;
    for(var i= 0; i < customItemList.length; i++){
      subtotal += customItemList[i].item.price * (customItemList[i].num - customItemList[i].promotion.num);
      saveUp += customItemList[i].item.price * customItemList[i].promotion.num;
    }
    return '----------------------\n' +
    '总计：' + Utils.formatter.formatPrice(subtotal) + '(元)\n' +
    '节省：' + Utils.formatter.formatPrice(saveUp) + '(元)\n' +
    '**********************';
}
Pos.prototype.getCustomList = function (customItemList){
     var customList = '----------------------\n';
     for(var i= 0; i < customItemList.length; i++){
       customList += '名称：' + customItemList[i].item.name +
       '，数量：' + customItemList[i].num + customItemList[i].item.unit +
       '，单价：' + (customItemList[i].item.price).toFixed(2) + '(元)，小计：' +
      this.getTotal(customItemList[i]) + '(元)\n';
     }
     return customList + '----------------------\n';
}
