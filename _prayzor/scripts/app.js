(function(){
	var app = angular.module('app', [
	  'ngRoute'
	]);

	app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	  $routeProvider
	    // Home
	    .when("/", {templateUrl: "partials/genres.html"})
	    // Pages
	    .when("/genres", {templateUrl: "partials/genres.html", controller: 'GenreController'})
		.when("/stations", {templateUrl: "partials/stations.html", controller: 'StationController'})
	    // else 404
		.otherwise("/404", {templateUrl: "partials/404.html"});

		// http Provider
		
		$httpProvider.defaults.useXDomain = true;

		delete $httpProvider.defaults.headers.common['X-Requested-With'];


	}]);

	app.controller('MainController', ['$scope', '$location', function($scope, $location) {
		$scope.tgState = false;
		$scope.currentStation = {};
		
		// Watch Genre
		$scope.$on('genreChanged', function(event, genre){
			$scope.currentStation.genre = genre;
			$scope.currentStation.station = '';
		});
		$scope.$on('stationChanged', function(event, station){
			$scope.currentStation.station = station
		});
		// On toggle set page slide position
		$scope.$on('tgStateChange', function (event, args) {
			$scope.tgState = args.state;
			$scope.pageWidth = (args.state) ? args.pagewidth + 'px' : '';
			$scope.leftPos = (args.state) ? args.pagewidth * .75 + 'px' : '';
		});

		if(!$scope.currentStation.genre){
			$location.url('genres');
		}

		$scope.user = {
			fName : 'Darryl',
			lName : 'Crockett',
			email : 'dcrockett2@hotmail.com'
		};
    }]);

	app.controller('GenreController', ['$scope', '$location', 'dataService', function($scope, $location, dataService){
		$scope.error = '';
		
		var config = {
			method : 'GET',
			url : 'http://prazor.com/index.php/rest/getGenres/'
		}

		dataService.getData(config).then(
			function(response){
				$scope.genres = response.data;
			},function(error){
				console.log(error);
			});		

		$scope.setGenre = function(genre){
			$scope.$emit('genreChanged', genre);
			$location.url('stations');
		};
	}]);



	app.controller('StationController', ['$scope', 'dataService', function($scope, dataService){
		// $scope.stations = stations;
		$scope.error = '';
		
		$scope.fetchStations = function() {
			
			var entryID = ($scope.currentStation.genre) ? $scope.currentStation.genre.entry_id : 1,
				config = {
				method : 'GET',
				url : 'http://prazor.com/index.php/rest/getGenres/details/' + entryID
			};

			dataService.getData(config).then(
				function(response){
					$scope.stations = response.data[0].stations;
				},function(error){
					console.log(error);
				});
	    };

	    $scope.fetchStations();
		
		$scope.setStation = function(station){
			$scope.$emit('stationChanged', station);
		};
	}]);


	app.service('dataService', ['$http', '$q', '$location', '$templateCache', function($http, $q, $location, $templateCache){
		
		this.getData = function(config){
			var deferred = $q.defer();
			$http({method: config.method, url: config.url, cache: $templateCache})
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



	app.directive('hamburgerToggle', function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				state: '=',
				pagewidth : '='
			},
			templateUrl: 'partials/hamburger-toggle.html',
			link: function($scope, $element, $attrs) {
				$scope.toggleState = function() {
					$scope.state = !$scope.state
					$scope.pagewidth = $('.page-container').width();
					$scope.$emit('tgStateChange', $scope);
				};
			}
		};
	});
})();