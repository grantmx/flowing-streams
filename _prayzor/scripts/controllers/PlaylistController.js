(function(){
	app.controller('PlaylistController', ['$scope', '$location', 'dataService', 'DataSource', function($scope, $location, dataService, DataSource){
		$scope.error = '';

		if($scope.$parent.currentCategory.category_id === undefined){
			$location.url('talk');
		}
		else{
			$scope.talk = $.extend(true, {}, $scope.$parent.currentCategory.subCategory);
			var config = {
				url : $scope.talk.kaltura_playlist_url
			}

			DataSource.get(config).then(
				function(response){
					$scope.playlist = response.urlset.url;
					console.log($scope.playlist);
				},function(error){
					console.log(error);
					$scope.error = error;
				});
		}
		

		$scope.playVideo = function(video){
			console.log(video);
			$scope.$parent.currentCategory.video = video;
			$location.url('talk/video');
		};
	}]);
})();