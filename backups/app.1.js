//Declare app as a new instance of express server.
var express = require("express");
var app = express(); var PORT = 3000;
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");
var request = require("request");
//Need a new instance of EventsEmitter in order to 
var apiData = require("events").EventEmitter();

var postdata = [];

//Used to load files from our public path, we supply the name/path as a parameter
//app.js will always be parent of /public so we uses __dirname 
function addPath(path){
    if(path) return `${__dirname}/public/${path}`;
    else return `${__dirname}/public`
}

//If we receive json data,
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(addPath()));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

function getJson(url, callback) {
    request({
        url: url,
        json: true,
    }, (error, response, body) => {
        if(error) console.log(error);
        callback(JSON.stringify(body));
    });
}
    

var user = {
    name: "Anthony Castillo"
};

/*
request({
    url: "https://btc-e.com/api/3/ticker/btc_usd",
    json: true,
}, function(error, response, body){
    if(!error && response.statusCode === 200){
        console.log(body);
        
    }
});
*/

getJson("https://btc-e.com/api/3/ticker/btc_usd", (err, body) => {
    if(err){
        console.log(err)
    } 
    else{
        app.get("/", (req,res) => {
            res.render(addPath("views/index.html"), {username: user.name});
        });
    }
});

//GET


app.get("/wallet", (req, res) => {
    res.render(addPath("views/new_wallet.html"));
});

//POST\\
app.post("/wallet", (req, res) => {
    postdata.push(req.body)
    res.json(postdata);
});


//APP LISTENING
app.listen(PORT, () => {
    console.log(`CoinBros application running on port ${PORT}`);
});