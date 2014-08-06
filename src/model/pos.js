function Pos(){
    this.scanner = new Scanner();
}
Pos.prototype.getShoppingList = function (inputs){

    var barcAndNumList = this.scanner.scanInputs(inputs);
    this.cart = new Cart(barcAndNumList);
    var custItemList = this.cart.getCustItemList(barcAndNumList);
    var shoppingList = this.createShoppingList(custItemList);

    return shoppingList;

}
Pos.prototype.createShoppingList = function (custItemList){
    var momen = (new moment()).format();
    var date = momen.substring(0,10).replace('-','年').replace('-','月') + '日 ';
    var time = momen.substring(11,19);
//    console.log(momen);
    formattedDateString = date + time;
    var shoppingList = '***<没钱赚商店>购物清单***\n' +
    '打印时间：' + formattedDateString + '\n' ;
    var custList = this.getCustList(custItemList);
    var freeList = this.getFreeList(custItemList);
    var subtotalAndSave = this.getSubtotalAndSave(custItemList);
    return shoppingList + custList + freeList + subtotalAndSave;
}
Pos.prototype.getFreeList = function (preAccountList){
    var shoppingList = '挥泪赠送商品：\n';
    for(var i= 0; i < preAccountList.length; i++){
      if(preAccountList[i].promotion.type !== 'no')
      shoppingList += '名称：' + preAccountList[i].item.name +
      '，数量：' + preAccountList[i].promotion.num + preAccountList[i].item.unit + '\n';
    }
    return shoppingList;
}
Pos.prototype.getTotal = function(preAccount){
    var preAccount = preAccount.item.price * (preAccount.num - preAccount.promotion.num);
    return preAccount.toFixed(2);
}
Pos.prototype.getSubtotalAndSave = function (preAccountList){
    var subtotal = 0;
    var saveUp = 0;
    for(var i= 0; i < preAccountList.length; i++){
      subtotal += preAccountList[i].item.price * (preAccountList[i].num - preAccountList[i].promotion.num);
      saveUp += preAccountList[i].item.price * preAccountList[i].promotion.num;
    }
    return '----------------------\n' +
    '总计：' + subtotal.toFixed(2) + '(元)\n' +
    '节省：' + 'FarmatOutput.farmatNum(saveUp)' + '(元)\n' +
    '**********************';
}
Pos.prototype.getCustList = function (preAccountList){
     var custList = '----------------------\n';
     for(var i= 0; i < preAccountList.length; i++){
       custList += '名称：' + preAccountList[i].item.name +
       '，数量：' + preAccountList[i].num + preAccountList[i].item.unit +
       '，单价：' + (preAccountList[i].item.price).toFixed(2) + '(元)，小计：' +
      this.getTotal(preAccountList[i]) + '(元)\n';
     }
     return custList + '----------------------\n';
}
