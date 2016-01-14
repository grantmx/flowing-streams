(function(){
	app.controller('VideoController', ['$scope', '$location', 'dataService', 'DataSource', function($scope, $location, dataService, DataSource){
		$scope.error = '';

		function newVideoPlayer(video){
			$("#videoHolder").html(
			    '<video width="100%" height="100%" controls poster="'+ video.thumbnail_loc.__text +'">' +
			        '<source src="'+ video.content_loc.__text +'" type="video/mp4"></source>' +
			    '</video>');
		}

		if($scope.$parent.currentCategory.video === undefined){
			$location.url('talk');
		}
		else{
			$scope.video = $.extend(true, {}, $scope.$parent.currentCategory.video);			
			newVideoPlayer($scope.video);
		}
		

		$scope.playVideo = function(video){
			newVideoPlayer(video);
		};
	}]);

})();