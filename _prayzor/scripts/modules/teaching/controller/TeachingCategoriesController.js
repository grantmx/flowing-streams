(function(){
	app.controller('TeachingCategoriesController', ['$scope', '$location', 'dataService', function($scope, $location, dataService){
		$scope.error = '';
		
		var config = {
			method : 'GET',
			url : 'http://prazor.com/rest/getTeachingCategories'
		}

		dataService.getData(config).then(
			function(response){
				$scope.categories = response.data.categories;
			},function(error){
				console.log(error);
			});	

		$scope.setCategory = function(category){
			$scope.$emit('stopAudio');
			$scope.$parent.currentCategory = category;
			$location.url('teaching/teaching');
		};
	}]);
})();