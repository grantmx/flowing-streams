(function(){
	app.controller('GenreController', ['$scope', '$location', 'dataService', 'DataFactory',
		function($scope, $location, dataService, DataFactory){
		$scope.error = '';
		
		var config = {
			method : 'GET',
			url : 'http://prazor.com/rest-dev/getGenres/'
		}

		dataService.getData(config).then(
			function(response){
				$scope.genres = response.data;
			},function(error){
				console.log(error);
			});	

		// $scope.genres = [{"title":"Premium","genre_image":"","entry_id":9},{"title":"Pop","genre_image":"","entry_id":2},{"title":"Rock","genre_image":"","entry_id":1},{"title":"Inspirational","genre_image":"","entry_id":4},{"title":"Urban","genre_image":"","entry_id":5},{"title":"Country","genre_image":"","entry_id":7},{"title":"World","genre_image":"","entry_id":8},{"title":"Blended","genre_image":"","entry_id":3}];

		$scope.setGenre = function(genre){
			DataFactory.currentStation.genre = genre;
			$scope.station = DataFactory.currentStation.station;
			DataFactory.station = {};
			$location.url('music/stations');
		};
	}]);
})();