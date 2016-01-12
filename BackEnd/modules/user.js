var query = require('./queries');
var mysql = require('./mysql_module');
/**
  *This file is a router for User resource
  *Version:0.0.1
  *Author:Markus Veijola
  *Description:Created this new file
  */

var express = require("express");

var router = express.Router();


router.get('/',function(req,res){
    mysql.getFriendsForUserByUsername(req,res);
    //query.getFriendsByUsername(req,res);
});

//This router handles a request to uri
//localhost:3000/friends/login
router.post('/login',function(req,res){
    
    //query.loginFriend(req,res);
    mysql.loginMysqlProc(req,res);
});

//This router handles a request to uri
//localhost:3000/friends/register
router.post('/register',function(req,res){
    mysql.registerUser(req,res);
    //query.registerFriend(req,res);
});

module.exports = router;