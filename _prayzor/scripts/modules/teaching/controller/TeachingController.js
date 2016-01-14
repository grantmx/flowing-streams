(function(){
	app.controller('TeachingController', ['$scope', '$location', 'dataService', function($scope, $location, dataService){
		$scope.error = '';

		if($scope.$parent.currentCategory.category_id === undefined){
			$location.url('talk');
		}
		else{
			$scope.category = $.extend(true, {}, $scope.$parent.currentCategory);
			var config = {
				method : 'GET',
				url : 'http://prazor.com/rest/getPartners/category/' + $scope.category.category_id
			}

			dataService.getData(config).then(
				function(response){
					$scope.data = response.data;
					console.log($scope.data);
				},function(error){
					console.log(error);
				});	
		}	


		$scope.setItem = function(teaching){
			$scope.$parent.currentCategory.subCategory = teaching;
			console.log(teaching);
			$location.url('teaching/playlist');			
		};
	}]);
})();


