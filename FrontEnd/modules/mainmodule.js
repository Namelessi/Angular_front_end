//Here we create our main module. First argument is the name of the module, the second one
//The '[] array' contains the dependencies to other angular modules
var main_module = angular.module('main_module',['ngRoute']);


//Create basic configuration for our angular app.
//Configuration includes USUALLY a router for our views.
//The $routeProvider object comes from ngRoute module
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'partial_login.html',
        controller:'controllerLogin'
    });
    
});