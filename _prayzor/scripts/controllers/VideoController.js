(function(){
	app.controller('VideoController', ['$scope', '$location', '$timeout', 'dataService', 'DataSource', 'DataFactory',
		function($scope, $location, $timeout, dataService, DataSource, DataFactory){
		$scope.error = '';

		function newVideoPlayer(video){
			video.entryId = getEntryID(video);
			kWidget.embed({
				'targetId': 'videoHolder',
				'wid': '_1949551',
				'uiconf_id' : '30806841',
				'entry_id' : video.entryId,
				'flashvars':{ // flashvars allows you to set runtime uiVar configuration overrides. 
					'autoPlay': false
				},
				'params':{ // params allows you to set flash embed params such as wmode, allowFullScreen etc
					'wmode': 'transparent' 
				}
			});
		}

		function getEntryID(video){
			var theUrl = video.content_loc.__text.split('entryId/'),
				secondHalf = theUrl[1].split('/'),
				entryId = secondHalf[0];

			return entryId;
		}

		if(DataFactory.currentCategory.video === undefined){
			$location.url($location.url().slice(1).split('/')[0]);
		}
		else{
			$scope.video = $.extend(true, {}, DataFactory.currentCategory.video);
			$scope.subcategories = DataFactory.subCategories;
			newVideoPlayer($scope.video);
			$scope.playlist = DataFactory.currentCategory.playlist;
			$timeout(function(){
				$('.multiple-items').slick({
					  infinite: false,
					  slidesToShow: 3,
					  slidesToScroll: 2,
					  arrows: true
					});
			}, 10);
			
		}

		$scope.playVideo = function(video){
			console.log(video);
			$scope.video = video;
			newVideoPlayer(video);
		};

		$scope.getPlaylist = function(playlist){
			var config = {
				url : playlist
			}

			DataSource.get(config).then(
				function(response){
					$scope.playlist = response.urlset.url;
					$timeout(function(){
						$('.multiple-items').slick('unslick');
						$('.multiple-items').slick({
							  infinite: false,
							  slidesToShow: 3,
							  slidesToScroll: 2,
							  arrows: true
							});
					}, 10);
				},function(error){
					console.log(error);
					$scope.error = error;
			});
		};

	}]);

})();