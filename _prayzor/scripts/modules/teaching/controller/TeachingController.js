(function(){
	app.controller('TeachingController', ['$scope', '$location', 'dataService', 'DataFactory', 
		function($scope, $location, dataService, DataFactory){
		$scope.error = '';

		if(DataFactory.currentCategory.category_id === undefined){
			$location.url('teaching');
		}
		else{
			$scope.category = $.extend(true, {}, DataFactory.currentCategory);
			var config = {
				method : 'GET',
				url : 'http://prazor.com/rest/getPartners/category/' + $scope.category.category_id
			}

			dataService.getData(config).then(
				function(response){
					$scope.data = response.data;
				},function(error){
					console.log(error);
				});	
		}	


		$scope.setItem = function(teaching){
			var config = {
				method : 'GET',
				url : 'http://prazor.com/rest/getPartners/entry/' + teaching.entry_id
			}
			//reset subcategoies
			DataFactory.subCategories = {};

			dataService.getData(config).then(
				function(response){
					if(response.data.length && response.data[0].categories.length){
						DataFactory.subCategories = response.data[0];
						DataFactory.subCategory = teaching;
						$location.url('teaching/playlist');
					}
					else{
						DataFactory.subCategory = teaching;
						$location.url('teaching/playlist');
					}
					
				},function(error){
					console.log(error);
			});	
		};
	}]);
})();


