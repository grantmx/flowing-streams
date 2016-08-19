(function(){
	app.directive('audioPlayerbar', ['$sce', 'dataService', '$timeout', 'DataFactory',
		function ($sce, dataService, $timeout, DataFactory){
		return {
			restrict: 'E',
			templateUrl: 'scripts/directives/audioPlayerBar/view/audioPlayerBar.html',
			scope: {
				playerHeight: '='
			},
			link: function(scope, element, attr){

				var timer;

				function setStation(details){
					DataFactory.currentStation.station = details.station;
					DataFactory.currentStation.stations = details.stations;					
					DataFactory.currentStation.$index = (details.index >= 0) ? details.index : DataFactory.currentStation.$index;

					

					scope.currentStation.genre = DataFactory.currentStation.genre
					scope.currentStation.station = DataFactory.currentStation.station;
					scope.currentStation.stations = DataFactory.currentStation.stations;
					scope.currentStation.$index = DataFactory.currentStation.$index;
					scope.hidePlayerBar = false;


					getStationPlaylistDetails(scope.currentStation.station);
				}

				function setCurrentSongDetails(data){
					var song = data.song[0],
						currentDate = new Date(),
						currentGMT = currentDate.toGMTString();
					
					currentGMT = currentGMT.slice(4).replace('GMT', '');

					var	currentGMTTime = new Date(currentGMT),	
						currentSeconds = currentGMTTime.getTime(),

						songStart = new Date(song.programStartTS),
						songSeconds = songStart.getTime(),
						songDuration = (parseInt(song.duration) * 1000),

						timeout = ((songSeconds + songDuration) - currentSeconds);

						DataFactory.currentStation.station.song = song;

						if(timeout > 0){
							$timeout.cancel(timer);
							timer = $timeout(function() {
			                    getStationPlaylistDetails(scope.currentStation.station);
			                }, timeout);
			                scope.playerHeight = $(element).find('.player-bar').height();
						}
						else{
							$timeout.cancel(timer);
							timer = $timeout(function() {
			                    getStationPlaylistDetails(scope.currentStation.station);
			                }, 5000);
						}

				}

				function getStationPlaylistDetails(station){
					// Call to get Playlist details
					var config = {
						method : 'GET',
						url : 'https://streamdb6web.securenetsystems.net/player_status_update/' + station.station_id + '_history.txt'
					};
					
					dataService.getPlaylistDetails(config).then(
						function(response){
							setCurrentSongDetails(response.data.playHistory);
						},function(error){
							console.log(error);
						});
				}

				// Sets play btn property
				function setPlayPauseBtn(isPlaying){
					scope.playPauseBtn = (!isPlaying) ? 'play' : 'pause';
				}



				function playAudio (station){
					dataService
						.getM3U(station.station_id)
						.then(buildPlayer);
				}


				// builds the player
				function buildPlayer (source){
					var source = M3U.parse(source.data)
					
					source = source[0].file

					if(!scope.audio){
						scope.audio = document.createElement("audio");
					}					

					scope.audio.setAttribute('src', source); //change the source
					scope.audio.load(); //load the new source
					scope.audio.play(); //play

					scope.playing = true;
					setPlayPauseBtn(scope.playing);
				}



				function setStationDetails(index, currentStation){
					var details = {};
					details.station = currentStation.stations[index];
					details.index = (index);
					details.stations = currentStation.stations;
					setStation(details);					
				}

				function stopAudio(){
					scope.audio.pause();
					scope.playing = false;
					setPlayPauseBtn(scope.playing);
					scope.hidePlayerBar = true;
					$timeout.cancel(timer);
					DataFactory.currentStation.station = {};
					$timeout.cancel(timer);
				}
				scope.currentStation = DataFactory.currentStation;
				scope.hidePlayerBar = true;
				scope.playerHeight = $(element).find('.player-bar').height();
				// Watches Index to change station
				scope.$watch('currentStation.$index', function (index, oldIndex) {
					if (index !== oldIndex && DataFactory.currentStation.stations) {
						var details = {};
						details.station = DataFactory.currentStation.stations[index];
						details.index = index;
						details.stations = DataFactory.currentStation.stations;

						details.index = index;
						setStation(details);
					};
				});

				scope.playing = true;
				setPlayPauseBtn(scope.playing);
				
				scope.previous = function(currentStation){
					var index = (currentStation.$index - 1);
					if(index >= 0){
						setStationDetails(index,currentStation);
					}
				};
				scope.next = function(currentStation){
					var index = (currentStation.$index + 1);
					if(index < currentStation.stations.length){
						setStationDetails(index,currentStation);
					}				
				};

				scope.playPause = function(){
					if(scope.playing){
						scope.audio.pause();
					}
					else{
						scope.audio.play();
					}

					scope.playing = !scope.playing;
					setPlayPauseBtn(scope.playing);			
				};

				scope.$watch('currentStation.station.station_id', function(model, oldModel){	
					if(model && model !== oldModel){				
						playAudio(DataFactory.currentStation.station);
						scope.hidePlayerBar = false;
					}			
				});

				scope.$on('stoppingAudio', function(model, oldModel){
					if(scope.audio){
						stopAudio();						
					}						
				});
			}
		}
	}]);
})();	