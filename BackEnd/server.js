var express = require("express");
var path = require("path");
var https = require('https');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person'); 
var user = require('./modules/user');
var mysql_module = require('./modules/mysql_module');

var options = {
    
    key:fs.readFileSync('server.key'),
    cert:fs.readFileSync('server.crt'),
    requestCert:false,
    rejectUnauthorized:false
}



//This is used for createing a secret key value
//for our session cookie
var uuid = require('uuid');

//Create a secret for our web token
var secret = uuid.v1();

exports.secret = secret;

//This is used to create a session object for client
var session = require('express-session');

var app = express();

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
//=====================Middlewares========================

app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:6000000}
}));
//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Define middlewares for our static files (.html,.css, .js files that are loaded
//by browser when parsing index.html file)
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views')));
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));

app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));

app.use('/FrontEnd/fonts',express.static(path.join(__dirname, '../FrontEnd/fonts')));

app.use('/FrontEnd/directives',express.static(path.join(__dirname, '../FrontEnd/directives')));

app.use('/friends',user);

app.get('/logout',function(req,res){
    
    req.session.destroy();
    res.redirect('/');
});



app.use(function(req,res,next){
    //Read the token from request
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    //Check if there was a token
       if(token){
            //verity that token is not 'guessed' by the client and it matches
            //the one we craeted in login phase
            jwt.verify(token,secret, function(err, decoded) {
                //There was error verifying the token
                if(err){

                    return res.send(401);
                }else{

                    req.decoded = decoded; 
                    console.log(req.decoded);
                    next();
                }
            });
        }else{
            
            res.send(403);
        }
});

//==============================OUR REST API MIDDLEWARES======================================//
app.use('/persons',person);

//This router checks if client is logged in or not
app.get('/isLogged',function(req,res){
    //User is logged in if session contains kayttaja attribute
    console.log("logged info:" + req.session.kayttaja);
    if(req.session.kayttaja){
        res.status(200).send([{status:'Ok'}]);   
    }
    else{
        
       res.status(401).send([{status:'Unauthorized'}]);  
    }
});

https.createServer(options,app).listen(app.get('port') ,app.get('ip'), function() 
{
    console.log("Express server started");
});










