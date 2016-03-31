(function(){
	app.controller('PlaylistController', ['$scope', '$location', '$timeout', 'dataService', 'DataSource', 'DataFactory', 
		function($scope, $location, $timeout, dataService, DataSource, DataFactory){

		$scope.error = '';

		function buildPlaylist(subcategories){
			for(var i = 0; i < subcategories.length; i++){
				setAllPlaylist(i, subcategories[i].category_playlist_url);
			}
		}

		function setPlaylist(){
			var config = {
				url : DataFactory.subCategory.kaltura_playlist_url
			}

			DataSource.get(config).then(
				function(response){
					$scope.playlist = response.urlset.url;
				},function(error){
					console.log(error);
					$scope.error = error;
			});
		}

		function setAllPlaylist(i, playlist){
			var config = {
				url : playlist
			}

			DataSource.get(config).then(
				function(response){
					$scope.subcategories.categories[i].playlist = response.urlset.url;
					$timeout(function(){
						$('.multiple-items' + i).slick({
							  infinite: false,
							  slidesToShow: 2,
							  slidesToScroll: 2,
							  arrows: true
							});
					}, 10);

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
				buildPlaylist($scope.subcategories.categories);
			}
			setPlaylist();

		}
		
		

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