
//This is the way you define controllers
//the main_module variable is defined in mainmodule.js file (located in module folder)
//The first argument is the name of the controller. THIS IS IMPORTANT, because you use THIS
//name when you want to use this controller in some view
//The $scope object is the glue between the view and controller. You use this object to transfer
//data between the view and controller
main_module.controller('controllerLogin',function($scope,loginFactory){
    
    //var user = $scope.user;
    //$scope.pass = "halituli"
    
    //This is called when login button is pressed in partial_login.html
    $scope.loginClicked = function(){
        
        console.log('login was pressed');
        
        var temp = {
            username:$scope.user,
            password:$scope.pass
        }
        
        loginFactory.startLogin();
    }
    
    $scope.registerClicked = function(){
        
        console.log('register was pressed');
    }
});