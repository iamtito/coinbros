//Declare app as a new instance of express server.
//These are the includes for our codes
var express = require("express");
var app = express(); var PORT = 3000;
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");
var request = require("request");

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
app.use((req, res, next) => {
    console.log(`${req.method} requested for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
});


function getJsonApi(url, callback) {
    request({
        url: url,
        json: true,
    }, (error, response, body) => {
        if(error)
        {
            console.log(error);
        } else{
            console.log(`Gathered ${response.statusCode}`);
            return callback(body);
        }
    });
}
    
var testObject = {
    first: "Anthony",
    last: "Castillo",
    name: "Anthony Castillo"
};



//GET
app.get("/", (req,res) => {
    getJsonApi("https://btc-e.com/api/3/ticker/btc_usd", (body) => {
        console.log(body.btc_usd.last);
        res.render(addPath("views/index.html"), {username: testObject.name, ticker: body.btc_usd.last});
    });
});

app.get("/wallet", (req, res) => {
    res.render(addPath("views/new_wallet.html"));
});

app.get("/login", (req, res) => {
    res.writeHead({"Content-Type":"text/html"})
    res.end("<h1>In Progress</h1>");
});

app.get("/signup", (req, res) => {
    res.writeHead({"Content-Type":"text/html"})
    res.end("<h1>In Progress</h1>");
});

app.get("/about", (req, res) => {
    res.writeHead({"Content-Type":"text/html"})
    res.end("<h1>In Progress</h1>");
});

app.get("/products", (req, res) => {
    res.writeHead({"Content-Type":"text/html"})
    res.end("<h1>In Progress</h1>");
});

//POST\\
app.post("/wallet", (req, res) => {
    postdata.push(req.body)
    res.json(postdata);
});

//APP LISTENING
app.listen(PORT,"10.134.105.140", () => {
    console.log(`CoinBros application running on port ${PORT}`);
});