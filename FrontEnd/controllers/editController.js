main_module.controller('editController',function($scope,friendDataFactory,$location,Flash){
    
    console.log('inside edit controller');
    var selectedFriend = friendDataFactory.getSelectedFriend();
    
    $scope.id = selectedFriend._id;
    $scope.name = selectedFriend.name;
    $scope.address = selectedFriend.address;
    $scope.age = selectedFriend.age;
    
    $scope.savePerson = function(){
        
        var temp = {
            
            id:$scope.id,
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        }
        
        friendDataFactory.updateData(temp).then(success,error);
    }
    
    function success(){
        friendDataFactory.friendsArray = [];
        $location.path('/list').replace();
    }
    
    function error(data){
        Flash.create('danger',data.message, 'custom-class'); 
    }
});