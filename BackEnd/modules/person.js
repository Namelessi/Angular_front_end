var express = require("express");
var db = require('./queries');

var router = express.Router();

//Handle GET requets for /persons context
router.get('/',function(req,res){
    
    db.getAllPersons(req,res);
});


router.get('/:nimi/:username',function(req,res){
    
    db.findPersonsByName(req,res);
});

//Handle POST requets for /persons context
router.post('/',function(req,res){
    
    db.saveNewPerson(req,res);
});

router.put('/',function(req,res){
    
    db.updatePerson(req,res);
});

router.delete('/:id/:username',function(req,res){
    db.deletePerson(req,res);
});

module.exports = router;