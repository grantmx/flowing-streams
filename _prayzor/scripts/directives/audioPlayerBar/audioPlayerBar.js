(function(){
	app.directive('audioPlayerbar', [function(){
		return {
			restrict: 'E',
			templateUrl: 'scripts/directives/audioPlayerBar/view/audioPlayerBar.html',
			scope: {
				ngModel : '='
			},
			link: function(scope, element, attr){
				console.log(scope);
				function setStation(details){
					scope.$parent.currentStation.station = details.station;
					scope.$parent.currentStation.stations = details.stations;					
					scope.$parent.currentStation.$index = (details.index >= 0) ? details.index : scope.$parent.currentStation.$index;

					scope.currentStation.genre = scope.$parent.currentStation.genre
					scope.currentStation.station = scope.$parent.currentStation.station;
					scope.currentStation.stations = scope.$parent.currentStation.stations;
					scope.currentStation.$index = scope.$parent.currentStation.$index;
					scope.hidePlayerBar = false;
				}
				
				scope.currentStation = {};
				scope.hidePlayerBar = true;

				// Watches Index to change station
				scope.$watch('$parent.currentStation.$index', function (index, oldIndex) {
					console.log(scope);
					if (index !== oldIndex && scope.$parent.currentStation.stations) {
						var details = {};
						details.station = scope.$parent.currentStation.stations[index];
						details.index = index;
						details.stations = scope.$parent.currentStation.stations;

						details.index = index;
						setStation(details);
					};
				});

				scope.playing = true;
				setPlayPauseBtn(scope.playing);
				
				scope.previous = function(currentStation){
					console.log('previous', currentStation);
					var index = (currentStation.$index - 1);
					if(index >= 0){
						setStationDetails(index,currentStation);
					}
				};
				scope.next = function(currentStation){
					console.log('next', currentStation);
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

				scope.$watch('$parent.currentStation.station.station_id', function(model, oldModel){	
					if(model && model !== oldModel){				
						playAudio(scope.$parent.currentStation.station);
						scope.hidePlayerBar = false;
					}			
				});

				scope.$on('stoppingAudio', function(model, oldModel){
					if(scope.audio){
						stopAudio();
					}						
				});

				// Sets play btn property
				function setPlayPauseBtn(isPlaying){
					scope.playPauseBtn = (!isPlaying) ? 'play' : 'pause';
				}

				function playAudio(station){
					if(!scope.audio){
						scope.audio = document.createElement("audio");
					}					

					scope.audio.setAttribute('src', "http://" + station.station_domain + ".securenetsystems.net/" + station.station_id); //change the source
					scope.audio.load(); //load the new source
					scope.audio.play(); //play

					scope.playing = true;
					setPlayPauseBtn(scope.playing);


					// jwAudio
					// if(!scope.audio){
						
					// 	scope.audio = jwplayer("audioPlayer");
					// 	scope.audio.setup({
					// 	      file: "http://" + station.station_domain + ".securenetsystems.net/" + station.station_id,
					// 	      height: 15,
					// 	      width: 'auto'
					// 	});
					// }
					// scope.audio.load(); //load the new source
					// scope.audio.play(); //play

					// scope.playing = true;
					// setPlayPauseBtn(scope.playing);

					// ngAudio
					// if(scope.audio){			
					// 	scope.audio.stop();
					// 	scope.audio.unbind();
					// }
					// scope.audio = ngAudio.load("http://" + station.station_domain + ".securenetsystems.net/" + station.station_id); // returns NgAudioObject
					// scope.audio.play();
					// scope.playing = true;
					// setPlayPauseBtn(scope.playing);

					console.log("http://" + station.station_domain + ".securenetsystems.net/" + station.station_id);
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
				}
			}
		}
	}]);
})();	