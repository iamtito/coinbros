//Express is an easy way/better than http, easy execution and file sending
var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
//Adding bitcore libarary, we called it bitcore
var bitcore = require("bitcore-lib");

app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json());

app.set("view engine", "ejs");

function coinbrosWallet(uinput, callback){
       //creating a new buffer 
    var input = new Buffer(uinput);
    //creating a hash by giving it sha256
    var hash = bitcore.crypto.Hash.sha256(input);
    //BN means big number, then hashing it from buffer
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    //pk variable for private key taking BN output.WalletImportFormat
    var pk = new bitcore.PrivateKey(bn).toWIF();
    var addy = new bitcore.PrivateKey(bn).toAddress();
   // var boddy = "https://blockchain.info/address/" + addy + "?format=json";
    //var show = body.total_sent;
    callback(pk, addy);
};

request({
    url: "https://btc-e.com/api/3/ticker/btc_usd",
    json: true
}, function(err, res, body){
    price = body.btc_usd.last;
});

app.get("/", function(req, res){
    //using sendfile will open a page
    //Since we are using ejs now, getting rid of below
    //res.sendfile(__dirname + "/index.html");
    res.render("index", {lastPrice: price});
});

app.get("/broswallet", function(req, res){
    res.render("index", {lastPrice: price});
});

app.get("/converter", function(req, res){
    res.render("index", {lastPrice: price});
});

app.post("/wallet", function(req, res){
    var coinbros = req.body.coinbros;
    console.log(coinbros);
    coinbrosWallet(coinbros, function(priv, addr){
    res.send("COINBROS wallet of " + coinbros + "<br>Address: " + addr + "<br> Private Key: " + priv + "<br> Total received: " )    
    }); 
});

//set the node listening port 
app.listen(4321, function(){
    console.log("working fine...");
});