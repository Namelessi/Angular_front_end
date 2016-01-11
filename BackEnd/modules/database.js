var mongoose = require("mongoose");
var db_name = "oma";
var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;

if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string,connectionStatus);

/**
  *Connectuion callback for fail and ok cases
  */
function connectionStatus(err,ok){
    
    if(err){
        
        console.log(err.message);
    }else{
        
        console.log("We are connected!");
    }
}

var User = mongoose.model('User',{
    username:{type:String,unique:true},
    password:String,
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:'Person'}]
});

var Person = mongoose.model('Person',{
     name:String,
     address:String,
     age:{type:Number}
},'person');

//Using exports object you expose the data to other modules
exports.Person = Person;
exports.Friends = User;
