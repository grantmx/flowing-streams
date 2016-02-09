(function(){
	app.controller('VideoController', ['$scope', '$location', '$timeout', 'dataService', 'DataSource', function($scope, $location, $timeout, dataService, DataSource){
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

		if($scope.$parent.currentCategory.video === undefined){
			$location.url('talk');
		}
		else{
			$scope.video = $.extend(true, {}, $scope.$parent.currentCategory.video);
			newVideoPlayer($scope.video);
			$scope.playlist = $scope.$parent.currentCategory.playlist;
			$timeout(function(){
				console.log('timeout');
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

	}]);

})();