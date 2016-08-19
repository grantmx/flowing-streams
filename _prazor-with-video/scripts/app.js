
var app = angular.module('app', [
  'ngRoute', 'ngTouch', 'angular-carousel', 'ngSanitize'
]);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "scripts/modules/genres/views/genres.html", controller: 'GenreController'})
    // Pages
    .when("/music/genres", {templateUrl: "scripts/modules/genres/views/genres.html", controller: 'GenreController'})
	.when("/music/stations", {templateUrl: "scripts/modules/stations/views/stations.html", controller: 'StationController'})
	.when("/music/audioplayer", {templateUrl: "scripts/modules/stations/views/station-player-view.html", controller: 'StationController'})
	.when("/teaching", {templateUrl: "scripts/templates/categories.html", controller: 'TeachingCategoriesController'})
	.when("/teaching/teaching", {templateUrl: "scripts/templates/subCategory.html", controller: 'TeachingController'})
	.when("/teaching/playlist", {templateUrl: "scripts/templates/playlist.html", controller: 'PlaylistController'})
	.when("/teaching/video", {templateUrl: "scripts/templates/video.html", controller: 'VideoController'})
	.when("/talk", {templateUrl: "scripts/templates/categories.html", controller: 'TalkCategoriesController'})
	.when("/talk/talk", {templateUrl: "scripts/templates/subCategory.html", controller: 'TalkController'})
	.when("/talk/playlist", {templateUrl: "scripts/templates/playlist.html", controller: 'PlaylistController'})
	.when("/talk/video", {templateUrl: "scripts/templates/video.html", controller: 'VideoController'})
    // else 404
	.when("/404", {templateUrl: "scripts/modules/pageError/views/404.html", controller: 'PageErrorController'})
	.otherwise({redirectTo:'/404'});
}]);


app.initialize = function() {
	this.bindEvents();
};
    
app.bindEvents = function() {
	document.addEventListener('deviceready', this.onDeviceReady, true);
};

app.onDeviceReady = function() {
	angular.element(document).ready(function() {
		angular.bootstrap(document);
	});

	window.analytics.startTrackerWithId('UA-73794751-1');
};

