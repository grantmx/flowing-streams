(function(){
	app.controller('PlaylistController', ['$scope', '$location', 'dataService', 'DataSource', 'DataFactory', 
		function($scope, $location, dataService, DataSource, DataFactory){
		
		$scope.error = '';

		function getPlaylist(playList){
			$scope.talk = $.extend(true, {}, DataFactory.subCategory);
			var config = {
				url : playList || $scope.talk.kaltura_playlist_url
			}

			DataSource.get(config).then(
				function(response){
					$scope.playlist = response.urlset.url;
				},function(error){
					console.log(error);
					$scope.error = error;
			});
		}

		if(DataFactory.currentCategory.category_id === undefined){
			$location.url($location.url().slice(1).split('/')[0]);
		}
		else{
			if(DataFactory.subCategories.categories && DataFactory.subCategories.categories.length){
				$scope.subcategories = DataFactory.subCategories;
			}
			else{
				getPlaylist();
			}

		}
		
		$scope.getPlaylist = function(playList){
			getPlaylist(playList);
		};

		$scope.playVideo = function(video){
			console.log(video);
			var location = $location.url(),
				currentLocation = location.slice(1).split('/')[0];
			DataFactory.currentCategory.video = video;
			DataFactory.currentCategory.playlist = $scope.playlist;
			$location.url(currentLocation + '/video');
		};
	}]);
})();