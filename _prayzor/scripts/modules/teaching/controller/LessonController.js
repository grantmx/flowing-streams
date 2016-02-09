(function(){
	app.controller('LessonController', ['$scope', '$location', 'dataService', function($scope, $location, dataService){
		$scope.error = '';		
		console.log($scope.$parent.currentLesson);
		if(!$scope.$parent.currentLesson.kaltura_playlist_url){
			$location.url('teaching');
		}
	}]);
})();