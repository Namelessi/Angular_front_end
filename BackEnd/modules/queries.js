var db = require('./database');

/**
 *This function gets all documents from person collection
 */
exports.getAllPersons = function(req,res){
    
    db.Person.find(function(err,data){
        
        if(err){
            
            console.log(err.message);
            res.send("Error in database");
        }
        else{
            
            res.send(data);
        }
    });
}

/**
  *This function saves new person information to our person
  *collection
  */
exports.saveNewPerson = function(req,res){
    
    var personTemp = new db.Person(req.body);
    //Save it to database
    personTemp.save(function(err,ok){
        
        db.Friends.update({username:req.body.user},
                          {$push:{'friends':personTemp._id}},
                          function(err,model){
            
            //console.log("SEND REDIRECT!!!!!");
            //Make a redirect to root context
            //res.redirect(301,'/persons.html');
            res.send("Added stuff");
        });
     
    });
}

//This function deletes one person from our collection
exports.deletePerson = function(req,res){
    
    //what happens here is that req.params.id
    //return string "id=34844646bbsksjdks"
    //split function splits the string form "="
    //and creates an array where [0] contains "id"
    //and [1] contains "34844646bbsksjdks"
    console.log(req.params);
    var id = req.params.id.split("=")[1];
    var userName = req.params.username.split("=")[1];
    db.Person.remove({_id:id},function(err){
        
        if(err){
            res.send(err.message);
        }
        else{
            //If succesfully removed remome also reference from
            //User collection
            db.Friends.update({username:userName},{$pull:{'friends':id}},function(err,data){
                console.log(err);
                res.send("Delete ok");    
            });
            
        }
        
    });
}

//This method updates one person info
exports.updatePerson = function(req,res){
    
    var updateData = {
        name:req.body.name,
        address:req.body.address,
        age:req.body.age
    }
    
    db.Person.update({_id:req.body.id},updateData,function(err){
        res.send({data:"ok"});
    });
}

/**
  *This function seraches database by name or 
  *by begin letters of name
  */
exports.findPersonsByName = function(req,res){
    
    var name = req.params.nimi.split("=")[1];
    var username = req.params.username.split("=")[1];
    console.log(name);
    console.log(username);
    db.Friends.find({username:username}).
        populate({path:'friends',match:{name:{'$regex':'^' + name,'$options':'i'}}}).
            exec(function(err,data){
        console.log(err);
        console.log(data);
        res.send(data[0].friends);
    });
    
    /*
    db.Person.find({name:{'$regex':'^' + name,'$options':'i'}},function(err,data){
        
        if(err){
            res.send('error');
        }
        else{
            console.log(data);
            res.send(data);
        }
    });*/
}

exports.registerFriend = function(req,res){
    
    var friend = new db.Friends(req.body);
    friend.save(function(err){
        
        if(err){
            
            res.send({status:err.message});
        }
        else{
            res.send({status:"Ok"});
        }
    });
}

exports.loginFriend = function(req,res){
    
    var searchObject = {
        username:req.body.username,
        password:req.body.password
    }
    
    db.Friends.find(searchObject,function(err,data){
        
        if(err){
            
            res.send({status:err.message});
            
        }else{
            //=< 0 means wrong username or password
            if(data.length > 0){
                res.send({status:"Ok"});
            }
            else{
                res.send({status:"Wrong username or password"});
            }
            
        }
    });
}

exports.getFriendsByUsername = function(req,res){
    
    var usern = req.params.username.split("=")[1];
    db.Friends.find({username:usern}).
        populate('friends').exec(function(err,data){
            
            console.log(err);
            console.log(data[0].friends);
            res.send(data[0].friends);
        
        });
}




