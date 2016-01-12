(function(){
	var app = angular.module('app', [
	  'ngRoute', 'ngTouch', 'angular-carousel', 'ngAudio'
	]);

	app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	  $routeProvider
	    // Home
	    .when("/", {templateUrl: "partials/genres.html"})
	    // Pages
	    .when("/genres", {templateUrl: "partials/genres.html", controller: 'GenreController'})
		.when("/stations", {templateUrl: "partials/stations.html", controller: 'StationController'})
		.when("/audioplayer", {templateUrl: "partials/station-player-view.html", controller: 'StationController'})
	    // else 404
		.otherwise("/404", {templateUrl: "partials/404.html"});

		// http Provider
		
		// $httpProvider.defaults.useXDomain = true;

		// delete $httpProvider.defaults.headers.common['X-Requested-With'];


	}]);

	app.controller('MainController', ['$scope', '$location', '$templateCache', function($scope, $location, $templateCache) {
		$scope.showSidebar = false;
		$scope.currentStation = {};
		$scope.menuItem = 'menu';
		$scope.hidePlayerBar = true;

		$scope.$on('$routeChangeStart', function(next, current) {		   
		   var currenlocation = $location.url();
		   console.log('Route Changed: ', currenlocation.slice(1));
		   $scope.menuItem = currenlocation;
		   $scope.playerView = currenlocation.slice(1);

		    if (typeof(current) !== 'undefined'){
	            $templateCache.remove(current.templateUrl);
	    	}
		});

		// Watch Genre
		$scope.$on('genreChanged', function(event, genre){
			$scope.currentStation.genre = genre;
			$scope.station = $scope.currentStation.station;
			$scope.currentStation.station = '';
		});

		$scope.$on('stationChanged', function(event, details){
			setStation(details);
		});

		// Watch side bar toggle
		$scope.$watch('showSidebar', function(model){
			console.log(model);
			// var pagewidth = $('.page-container').width();
			// $scope.pageWidth = (model) ? pagewidth + 'px' : '';
			// $scope.leftPos = (model) ? pagewidth * .75 + 'px' : '';
		});

		// Watches Index to change station
		$scope.$watch('currentStation.$index', function (index, oldIndex) {
			if (index !== oldIndex) {
				var details = {};
				details.station = $scope.currentStation.stations[index];
				details.index = index;
				details.stations = $scope.currentStation.stations;

				details.index = index;
				setStation(details);
			};
		});

		$scope.quickMenu = function(item){
			var currenlocation = $location.url();

			if(currenlocation === '/stations'){
				$location.url('genres');
			}
			else if(currenlocation === '/audioplayer'){
				$location.url('stations');
			}
			else{
				$location.url('genres');
				$scope.showSidebar = !$scope.showSidebar;
			}
		};
		

		if(!$scope.currentStation.genre){
			$location.url('genres');
		}

		$scope.user = {
			fName : 'Darryl',
			lName : 'Crockett',
			email : 'dcrockett2@hotmail.com'
		};

		function setStation(details){
			$scope.currentStation.station = details.station;
			$scope.currentStation.stations = details.stations;
			$scope.currentStation.$index = (details.index >= 0) ? details.index : $scope.currentStation.$index;
			$scope.hidePlayerBar = false;
		}
    }]);

	app.controller('GenreController', ['$scope', '$location', 'dataService', function($scope, $location, dataService){
		$scope.error = '';
		
		var config = {
			method : 'GET',
			url : 'http://prazor.com/rest/getGenres/'
		}

		dataService.getData(config).then(
			function(response){
				$scope.genres = response.data;
			},function(error){
				console.log(error);
			});	

		// $scope.genres = [{"title":"Premium","genre_image":"","entry_id":9},{"title":"Pop","genre_image":"","entry_id":2},{"title":"Rock","genre_image":"","entry_id":1},{"title":"Inspirational","genre_image":"","entry_id":4},{"title":"Urban","genre_image":"","entry_id":5},{"title":"Country","genre_image":"","entry_id":7},{"title":"World","genre_image":"","entry_id":8},{"title":"Blended","genre_image":"","entry_id":3}];

		$scope.setGenre = function(genre){
			$scope.$emit('genreChanged', genre);
			$location.url('stations');
		};
	}]);



	app.controller('StationController', ['$scope', '$location', 'dataService', function($scope, $location, dataService){
		$scope.error = '';		
		
		$scope.playStation = function(station, index){
			var details = {};
			
			details.station = station;
			details.index = index;
			details.stations = $scope.stations;
			$scope.$emit('stationChanged', details);
		};

		$scope.audioPlayer = function(station, index){
			var details = {};

			details.station = station;
			details.index = index;
			details.stations = $scope.stations;

			$location.url('audioplayer');
			$scope.$emit('stationChanged', details);			
		};		

		function fetchStations() {			
			var entryID = ($scope.currentStation.genre) ? $scope.currentStation.genre.entry_id : 1,
				config = {
				method : 'GET',
				url : 'http://prazor.com/rest/getGenres/details/' + entryID
			};

			dataService.getData(config).then(
				function(response){
					$scope.stations = response.data[0].stations;
					console.log($scope.stations);
				},function(error){
					console.log(error);
				});
	    };

	    // $scope.stations = [{"row_id":1,"station_name":"Generation Z","station_image":"http://prazor.com/images/uploads/genre/Gen_Z.jpg","station_id":"PRAZOR18","station_domain":"ice41","station_information":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"row_id":2,"station_name":"Upbeat","station_image":"http://prazor.com/images/uploads/genre/Upbeat.jpg","station_id":"PRAZOR19","station_domain":"ice41","station_information":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"row_id":3,"station_name":"Ageless Rock","station_image":"http://prazor.com/images/uploads/genre/Ageless_rock.jpg","station_id":"PRAZOR20","station_domain":"ice41","station_information":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"row_id":21,"station_name":"Classic Alternative","station_image":"http://prazor.com/images/uploads/genre/Classic_Alt.jpg","station_id":"PRAZOR21","station_domain":"ice6","station_information":""},{"row_id":22,"station_name":"Adult Alternative","station_image":"http://prazor.com/images/uploads/genre/Alternative.jpg","station_id":"PRAZOR22","station_domain":"ice6","station_information":""},{"row_id":23,"station_name":"Blues","station_image":"http://prazor.com/images/uploads/genre/Blues.jpg","station_id":"PRAZOR23","station_domain":"ice6","station_information":""},{"row_id":24,"station_name":"Acoustic","station_image":"","station_id":"PRAZOR24","station_domain":"ice6","station_information":""},{"row_id":25,"station_name":"Independent","station_image":"","station_id":"PRAZOR25","station_domain":"ice6","station_information":""}];
	    fetchStations();

	}]);

	app.controller('PlayerController', ['$scope', 'ngAudio', function($scope, ngAudio){		
		$scope.playing = true;
		setPlayPauseBtn($scope.playing);
		
		$scope.previous = function(currentStation){
			console.log('previous', currentStation);
			var index = (currentStation.$index - 1);
			if(index >= 0){
				setStationDetails(index,currentStation);
			}
		};
		$scope.next = function(currentStation){
			console.log('next', currentStation);
			var index = (currentStation.$index + 1);
			if(index < currentStation.stations.length){
				setStationDetails(index,currentStation);
			}				
		};

		$scope.playPause = function(){
			if($scope.playing){
				$scope.audio.pause();
			}
			else{
				$scope.audio.play();
			}

			$scope.playing = !$scope.playing;
			setPlayPauseBtn($scope.playing);			
		};

		$scope.$watch('currentStation.station.station_id', function(model, oldModel){		
			if(model && model !== oldModel){				
				playAudio($scope.currentStation.station);
			}			
		});

		// Sets play btn property
		function setPlayPauseBtn(isPlaying){
			$scope.playPauseBtn = (!isPlaying) ? 'play' : 'pause';
		}

		function playAudio(station){
			var volume = .5;
			if($scope.audio){
				volume = $scope.audio.volume;			
				$scope.audio.stop();
				$scope.audio.unbind();
			}
			$scope.audio = ngAudio.load("http://" + station.station_domain + ".securenetsystems.net/" + station.station_id); // returns NgAudioObject
			$scope.audio.volume = volume;
			$scope.audio.play();
			$scope.playing = true;
			setPlayPauseBtn($scope.playing);
		}

		function setStationDetails(index, currentStation){
			var details = {};
			details.station = currentStation.stations[index];
			details.index = (index);
			details.stations = currentStation.stations;
			$scope.$emit('stationChanged', details);
		}
	}]);

	app.service('dataService', ['$http', '$q', '$location', '$templateCache', function($http, $q, $location, $templateCache){
		
		this.getData = function(config){
			var deferred = $q.defer();
			$http({
				method: config.method, 
				url: config.url, 
				cache: $templateCache,
				headers: {
				  'Content-Type': 'application/json'
				},
			})
				.then(					
					function(response) {
						if(response.data){
							deferred.resolve(response);
						}
						else{
							deferred.reject('Error Fetching Data');
						}
					}, 
					function(error) {
						deferred.reject(error);
					});
			
			return deferred.promise;
		}
		
	}]);
})();
