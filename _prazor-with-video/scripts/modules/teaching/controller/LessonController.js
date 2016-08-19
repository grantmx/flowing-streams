(function(){
	app.controller('LessonController', ['$scope', '$location', 'dataService', 'DataFactory', 
		function($scope, $location, dataService, DataFactory){
		$scope.error = '';		
		console.log(DataFactory.currentLesson);
		if(!DataFactory.currentLesson.kaltura_playlist_url){
			$location.url('teaching');
		}
	}]);
})();