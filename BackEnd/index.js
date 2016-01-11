var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person'); 
var user = require('./modules/user');

//This is used for createing a secret key value
//for our session cookie
var uuid = require('uuid');
//This is used to create a session object for client
var session = require('express-session');

var app = express();
//=====================Middlewares========================

app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:600000}
}));
//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req,res,next){
    
    //console.log(req.method);
    //console.log(req.path);
    //console.log(__dirname);
    //console.log(req.body);
    //console.log(req.session);
    //console.log(database.Person);
    //database.myFunction();
    //Send request forward in stack
    next();
});

//Define middlewares for our static files (.html,.css, .js files that are loaded
//by browser when parsing index.html file)
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));

app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));

app.use('/FrontEnd/fonts',express.static(path.join(__dirname, '../FrontEnd/fonts')));

//==============================OUR REST API MIDDLEWARES======================================//
app.use('/persons',person);
app.use('/friends',user);

//=====================ROUTERS============================

app.get('/logout',function(req,res){
    
    req.session.destroy();
    res.redirect('/');
});




app.listen(3000);