main_module.controller('friendDataController',function($scope,friendDataFactory,$location){
    
    $scope.name = "by Jussi Juonio";
	$scope.temp = ['Heikki Hela','Risto Mattila','Juha Sipilä','Teuvo Hakkarainen'];
	$scope.navbarData = {
		
		urls:['/logout','#/delete','#/insert'],
		texts:['Logout','Delete','Insert']
	}
    console.log('friendDataController loaded');
    
    friendDataFactory.getFriendData(dataCallback);
    
    $scope.rowCliked = function(id){
        
        friendDataFactory.selected_id = id;
        $location.path('/edit').replace();
    }
    
    function dataCallback(dataArray){
        
        $scope.friendData = dataArray;
    }
    
    $scope.search = function(){
        console.log('search pressed');
        friendDataFactory.search($scope.search_term).then(function(data){
            console.log(data.name);
            $scope.friendData = data;
            
        });
    }
});