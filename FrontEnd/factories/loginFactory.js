main_module.factory('loginFactory',function(){
    
    var factory = {};
    
    //This function ca be called from ANY controller usnig this factory
    //implementation
    factory.startLogin = function(data){
        
        console.log(data);
    }
    
    //Facttory must always return an object!!!!
    return factory;
    
})