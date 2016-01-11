main_module.controller('addController',function($scope,friendDataFactory,Flash){
    
    $scope.name = "";
    $scope.address = "";
    $scope.age = 0;
    $scope.savePerson = function(){
        $('#save').attr("disabled", true);
        var temp = {
            
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        }
        if(temp.name.length === 0 || temp.address.length === 0 || temp.age.length === 0){
            
            alert('Need more data!');
            return;
        }
        
        friendDataFactory.insertData(temp).then(function(response){
            
            friendDataFactory.friendsArray.push(response.data);
            Flash.create('success', 'New friend added!', 'custom-class');
            $scope.name = "";
            $scope.address = "";
            $scope.age = "";
            $('#save').attr("disabled", false);
        },function(error){
            $('#save').attr("disabled", false);
            Flash.create('warning', 'Failed to add friend!', 'custom-class');
        });
    }
});