(function(){
	app.controller('MainController', ['$scope', '$location', '$templateCache', function($scope, $location, $templateCache) {
		$scope.showSidebar = false;		
		$scope.menuItem = 'menu';
		$scope.currentStation = {};
		$scope.currentCategory = {};
		$scope.stopAudio = false;
		$scope.windowHeight = $( window ).height();
		
		$scope.$on('$routeChangeStart', function(next, current) {		   
		   	var currenlocation = $location.url();		   
		   	$scope.activeSubNav = currenlocation.slice(1).split('/')[0];		   	
		   	$scope.quickMenuItem = (currenlocation.slice(1).split('/')[1] && currenlocation.slice(1).split('/')[1] !== 'genres') ? 'back_arrow' : 'menu';
		   	$scope.playerType = (currenlocation.slice(1).split('/')[1] === 'audioplayer') ? 'large' : 'small';

		    if (typeof(current) !== 'undefined'){
	            $templateCache.remove(current.templateUrl);
	    	}
		});

		$scope.$on('stopAudio', function(next, current) {
			$scope.$broadcast('stoppingAudio');
		});


		$scope.quickMenu = function(item){
			if(item === 'menu' || item === 'genres'){
				$scope.showSidebar = !$scope.showSidebar;				
			}
			else{
				window.history.back();
			}
		};

		$scope.user = {
			fName : 'John',
			lName : 'Doe',
			email : 'john_doe@mail.com'
		};
		
    }]);
})();