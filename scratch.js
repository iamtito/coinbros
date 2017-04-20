//A file that we can use to test and delete some code
var bitcore = require("bitcore-lib");

var privateKey = new bitcore.PrivateKey();
console.log(privateKey);
var address = privateKey.toAddress();
console.log(address);

var privateKey_2 = new bitcore.PrivateKey();
var address_2 = privateKey.toAddress();

var utxo = {
  "txId" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
  "outputIndex" : 0,
  "address" : `${address}`,
  "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
  "satoshis" : 50000
};

var transaction = new bitcore.Transaction().from(utxo).to(address_2, 15000).sign(privateKey);
console.log(transaction)