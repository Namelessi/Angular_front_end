main_module.directive('navBar',function(){
	
	var directive = {};
	
	directive.restrict = 'AE';
	directive.templateUrl = '/FrontEnd/directives/navbar.html';
	directive.scope = {
		
		navbarData:'='
	}
	
	directive.link = function(scope,elem,attrs){
		
		//$('a').first.addClass('active');
		$('a').click(function(){
			console.log('Link cliked');
			if(!this.hasClass('active'))
				this.addClass('active');
		});
	}
	
	return directive;
	
});