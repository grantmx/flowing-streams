(function(){	
	app.controller('StationController', ['$scope', '$location', 'dataService', 'DataFactory',
		function($scope, $location, dataService, DataFactory){
		$scope.error = '';	

		$scope.playStation = function(station, index, isPlayerView){
			var details = {};
			
			details.station = station;
			details.index = index;
			details.stations = $scope.stations;
			if(isPlayerView){
				$location.url('music/audioplayer');
			}
			if(DataFactory.currentStation.station.station_id !== details.station.station_id){
				setStation(details);
			}
			station.state = 'play';
		};
		

		function setStation(details){

			DataFactory.currentStation.station = details.station;
			DataFactory.station = details.station;
			DataFactory.currentStation.stations = details.stations;
			DataFactory.currentStation.$index = (details.index >= 0) ? details.index : $scope.currentStation.$index;
			$scope.genre = DataFactory.currentStation.genre;
			DataFactory.genre = $scope.genre;
			
			$scope.hidePlayerBar = false;
			$scope.station = details.station;
		}

		function fetchStations() {
			if(!DataFactory.currentStation.genre.entry_id){
				$location.url('music/genres');
			}
			else{
				$scope.currentStation = DataFactory.currentStation;
				$scope.station = DataFactory.currentStation.station;
				$scope.genre = DataFactory.genre;
				var entryID = DataFactory.currentStation.genre.entry_id,
					config = {
					method : 'GET',
					url : 'http://prazor.com/rest/getGenres/details/' + entryID
				};

				dataService.getData(config).then(
					function(response){
						$scope.stations = response.data[0].stations;
					},function(error){
						console.log(error);
					});

				// $scope.stations = [{"row_id":1,"station_name":"Generation Z","station_image":"http://prazor.com/images/uploads/genre/Gen_Z.jpg","station_id":"PRAZOR18","station_domain":"ice41","station_information":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"row_id":2,"station_name":"Upbeat","station_image":"http://prazor.com/images/uploads/genre/Upbeat.jpg","station_id":"PRAZOR19","station_domain":"ice41","station_information":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"row_id":3,"station_name":"Ageless Rock","station_image":"http://prazor.com/images/uploads/genre/Ageless_rock.jpg","station_id":"PRAZOR20","station_domain":"ice41","station_information":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"row_id":21,"station_name":"Classic Alternative","station_image":"http://prazor.com/images/uploads/genre/Classic_Alt.jpg","station_id":"PRAZOR21","station_domain":"ice6","station_information":""},{"row_id":22,"station_name":"Adult Alternative","station_image":"http://prazor.com/images/uploads/genre/Alternative.jpg","station_id":"PRAZOR22","station_domain":"ice6","station_information":""},{"row_id":23,"station_name":"Blues","station_image":"http://prazor.com/images/uploads/genre/Blues.jpg","station_id":"PRAZOR23","station_domain":"ice6","station_information":""},{"row_id":24,"station_name":"Acoustic","station_image":"","station_id":"PRAZOR24","station_domain":"ice6","station_information":""},{"row_id":25,"station_name":"Independent","station_image":"","station_id":"PRAZOR25","station_domain":"ice6","station_information":""}];
			}	
			
	    };

	    fetchStations();

	}]);
})();