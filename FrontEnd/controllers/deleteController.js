main_module.controller('deleteController',function($scope,friendDataFactory,Flash,$location){
    
    $scope.deleteArray = [];
    
    friendDataFactory.getFriendData(function(dataArray){
        
        $scope.friendData = dataArray;
    });
    
    //Called when user click one of the checkboxes from table
    //First argument is a event. There we can check if checkbox is selected
    //or not. Index is the index of cliked row in table. Id is the id of 
    //person we want to delete
    $scope.addToDelete = function($event,$index,id){
        
        //Check if item was selected
        if(event.target.checked){
            //Add the id to our delete array
            $scope.deleteArray.push(id);
        }
        else{
            //Remove if item was unchecked
            var temp_index = jQuery.inArray(id, $scope.deleteArray);
            $scope.deleteArray.splice(temp_index,1);
        }
        console.log($scope.deleteArray);
    }
    
    //This is called when delete button is pressed
    $scope.sendToDelete = function(){
        //Nothing to delete
        if($scope.deleteArray.length === 0){
            
            Flash.create('warning', 'Nothing to delete!', 'custom-class');
        }
        else{
            
            var data = {
                
                forDelete:$scope.deleteArray
            }
            
            friendDataFactory.deleteData(data).then(function(data){
                friendDataFactory.friendsArray = [];
                $location.path('/list').replace();
                
            },function(error){
                
                Flash.create('warning', 'Error in server!', 'custom-class');
            });
        }
    }
    
});