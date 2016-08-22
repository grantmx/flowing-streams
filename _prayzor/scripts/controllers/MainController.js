(function(){
	app.controller('MainController', ['$scope', '$sce', '$location', '$templateCache', '$timeout', '$window',
	function ($scope, $sce, $location, $templateCache, $timeout, $window) {
		var activeHelper = false;
		$scope.showSidebar = false;		
		$scope.menuItem = 'menu';
		$scope.stopAudio = false;
		$scope.stickyNavHeight = 110;
		
		$scope.$on('$routeChangeStart', function(next, current) {		   
		   	var currenlocation = $location.url();		   
		   	$scope.activeSubNav = currenlocation.slice(1).split('/')[0];		   	
		   	$scope.quickMenuItem = (currenlocation.slice(1).split('/')[1] && currenlocation.slice(1).split('/')[1] !== 'genres') ? 'back_arrow' : 'menu';
		   	$scope.playerType = (currenlocation.slice(1).split('/')[1] === 'audioplayer') ? 'large' : 'small';
		   	$scope.windowHeight = ($scope.showSidebar) ? $( window ).height() + 85 : $( window ).height();
		    if (typeof(current) !== 'undefined'){
	            $templateCache.remove(current.templateUrl);
	    	}
	    	
	    	$timeout(function() {
				$scope.playerHeight = $('.player-bar').height();
	        }, 1);

	        $('#slaask-button').addClass('hide');
	    	$('.slaask-message').addClass('hide');
		});

		$scope.$on('stopAudio', function(next, current) {
			$scope.$broadcast('stoppingAudio');
		});

		$scope.closeSideBar = function(){
			$scope.showSidebar = false;
		}

		$scope.quickMenu = function(item){
			if(item === 'menu' || item === 'genres'){
				$scope.showSidebar = !$scope.showSidebar;
				if(!activeHelper){
					_slaask.init('5de41f8d3e3bf771cc8ac707c8502535');
					activeHelper = true;
				}
				$('#slaask-button').toggleClass('hide');
				$('.slaask-message').toggleClass('hide');			
			}
			else{
				window.history.back();
			}
		};

		angular.element($window).bind('resize', function(){
		    $scope.$apply();
		});

	    $scope.getOrientation = function(){
	        var w = $window.innerWidth,
	            h = $window.innerHeight;
	        var orientation = (w > h) ? 'landscape' : 'portrait'
	        return (w > h) ? 'landscape' : 'portrait';

	    };

	    $scope.$watch($scope.getOrientation, function(newValue, oldValue){
	        $scope.orientation = newValue;
	        $scope.stickyNavHeight = $('.headerContaner').height();
	        $scope.playerHeight = $('.player-bar').height();
	    }, true);

		$timeout(function() {
			$scope.stickyNavHeight = $('.headerContaner').height();	
            $('#slaask-button').addClass('hide');
        }, 1000);
		
		
    }]);
})();