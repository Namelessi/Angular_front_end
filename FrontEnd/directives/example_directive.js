//Create new directive with name ofExample
main_module.directive('ofExample',function(){

    //Create empty object. We will fill it with needed
    //information below.
    var directive = {};
    //First define how our directive can be used using the stric attribute
    //possible values are: 
    //'A' as attribute
    //'C' as class
    //'E' as element
    //'M' as comment
    //or combination of pervious values like 'AE' 
    directive.restrict = 'AEC';
	
	//Create isolated scope for our directive
	//From this point on our directive CANNOT use parent scope
	directive.scope = {
		//Text Binding
		name:'@myname',
		//Two way binding
		users:'='
	}
	//Normally you just override the link function
	//in your directive
	directive.link = function(scope,elem,attrs){
		
		$(elem).click(function(){
			
			console.log('directive clicked');
			scope.getWeather();
		});
					  
	}
	
	//You can also define own controller for your directive
	directive.controller = function($scope,$http){
		
		console.log('directive controller activated');
		$scope.getWeather = function(){
			
			$http.get('http://api.openweathermap.org/data/2.5/weather?q={oulu}').
				then(function(data){

					console.log(data);
					$scope.temp = data.temp;

			});
		}
	}
	/*
	//Compile function is called before this directive
	//is rendered on browser window
	directive.compile = function(elem,attrs){
		//Use jQuery to set background for our directive element
		$(elem).css('background-color','lightgrey');
		//Compile must always return link function
		//Link function is called when compoent is rendered
		//on browser window
		return function link(scope,elem,attrs){
			
			console.log(scope.name);
			console.log(scope.users);
		}
	}*/
    //Define the template code
    directive.templateUrl = "/FrontEnd/directives/content.html";
    //We must always return an object from directive!
    return directive;
	/*Another way to declare and return directive object
	return {
		
		restrict:'AEC',
		templateURL:
	}*/
		
});