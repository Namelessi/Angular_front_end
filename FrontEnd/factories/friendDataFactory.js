main_module.factory('friendDataFactory',function($resource,$http){
    
    var factory = {};
    factory.selected_id = null;
    //In this array we cache the friends information,
    //so that once stored in array we wont make any further request
    factory.friendsArray = [];
    
    factory.getFriendData = function(callbackFunc){
        
        if(factory.friendsArray.length === 0){
            //Set your own headers in request like this
            $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
              factory.friendsArray = data;
              callbackFunc(factory.friendsArray);    
                
            },function(error){
                
                factory.friendsArray = [];
                callbackFunc(factory.friendsArray);
            });
        }
        else{
            
            callbackFunc(factory.friendsArray);
        }
    }
    //Updates the data to back end
    factory.updateData = function(data){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var resource = $resource('/persons',{},{'put':{method:'PUT'}});
        return resource.put(data).$promise;
    }
    
    factory.deleteData = function(data){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        $http.defaults.headers.common['content-type'] = 'application/json'; 
        var resource = $resource('/persons',{},{'delete':{method:'DELETE'}});
        return resource.delete(data).$promise;
    }
    
    /**
      *This function searches a person from array containing an id
      *that was stored when user cliked the row in the partial_dataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factory.getSelectedFriend = function(){
        
        for(var i = 0; i < factory.friendsArray.length; i++){
            
            if(factory.friendsArray[i]._id === factory.selected_id){
                
                return factory.friendsArray[i];
            }
        }
        
    }
    
    //Updates the data to back end
    factory.insertData = function(data){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var resource = $resource('/persons',{},{'post':{method:'POST'}});
        return resource.post(data).$promise;
    }
    
    factory.search = function(term){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var resource = $resource('/persons/search/',{name:term},{'get':{method:'GET'}});
        return resource.query().$promise;
    }
    
    return factory;
    
});