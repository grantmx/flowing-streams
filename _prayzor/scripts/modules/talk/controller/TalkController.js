(function(){
	app.controller('TalkController', ['$scope', '$location', 'dataService', function($scope, $location, dataService){
		$scope.error = '';

		if($scope.$parent.currentCategory.category_id === undefined){
			$location.url('talk');
		}
		else{
			$scope.category = $.extend(true, {}, $scope.$parent.currentCategory);
			var config = {
				method : 'GET',
				url : 'http://prazor.com/rest/getTalk/category/' + $scope.category.category_id
			}

			dataService.getData(config).then(
				function(response){
					$scope.data = response.data;
				},function(error){
					console.log(error);
				});	
		}	


		$scope.setItem = function(talk){
			$scope.$parent.currentCategory.subCategory = talk;
			$location.url('talk/playlist');
			console.log(talk);
		};
	}]);
})();