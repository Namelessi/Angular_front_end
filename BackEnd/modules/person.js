var express = require("express");
var db = require('./queries');

var router = express.Router();

//Handle GET requets for /persons context
router.get('/',function(req,res){
    console.log('Bacic get route called');
    db.getAllPersons(req,res);
});


router.get('/search',function(req,res){
    console.log('Router for query called');
    db.findPersonsByName(req,res);
});

//Handle POST requets for /persons context
router.post('/',function(req,res){
    
    db.saveNewPerson(req,res);
});

router.put('/',function(req,res){
    
    db.updatePerson(req,res);
});

router.delete('/',function(req,res){
    db.deletePerson(req,res);
});

module.exports = router;