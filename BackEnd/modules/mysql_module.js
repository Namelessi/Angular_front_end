var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../server');

//Define connection attributes for mysql server
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'friends_schema'
});

//Connect to mysql server with given connection attributes
connection.connect(function(err){
    
    if(err){
        console.log('Could not connect to mysql server:' + err.message);
    }else{
        
        console.log('Connected to mysql server:database friends_schema');
    }
});

//Call this function to check username and password from mysql database
exports.loginMysql = function(req,res){
    
    connection.query('SELECT * FROM user WHERE username=? and pass=?',
                     [req.body.username,req.body.password],function(error,results,fields){
        
        console.log(error);
        console.log(results);
        console.log(fields);
    });
}

exports.loginMysqlProc = function(req,res){
    
    connection.query('CALL getLoginInfo(?,?)',[req.body.username,req.body.password],
                     function(error,results,fields){
        
       if(error){
           
           res.send(502,{status:error.message});
       }else{
           
           var test = results[0];
           if(results.length > 0){
               req.session.kayttaja = test[0].username;
               //Create the token
               var token = jwt.sign(results,server.secret,{expiresIn:'2h'});
               res.send(200,{status:"Ok",secret:token});
        }
        else{
            res.send(401,{status:"Wrong username or password"});
        }
       } 
    });
}

exports.getFriendsForUserByUsername = function(req,res){
    
    connection.query('CALL getUserFriendsByName(?)',
[req.session.kayttaja],function(error,results,fields){
        
        if(results.length > 0){
            var data = results[0];
        
            res.send(data);
        }else{
        
            res.redirect('./');
        }
    });
}

exports.registerUser = function(req,res){
    
    connection.query('CALL registerUser(?,?)',
                    [req.body.username,req.body.password],
                    function(error,results,fields){
        
        
        if(error){
            
            res.status(500).send({status:"Username allready in use"});
        }
        else{
            res.status(200).send({status:"Ok"});
        }
    });
}

exports.addNewFriend  = function(req,res){
    
    connection.query('CALL addNewFriend(?,?,?,?)',
                    [req.body.name,req.body.address,req.body.age,req.session.userid],
                    function(error,results,fields){
        
        if(error){
                
                res.status(500).json({message:'Fail'});
            }else{
                
                res.status(200).json({data:newData});
            }
    });
}





