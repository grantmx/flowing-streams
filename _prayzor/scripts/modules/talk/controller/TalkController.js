(function(){
	app.controller('TalkController', ['$scope', '$location', 'dataService', 'DataFactory',
		function($scope, $location, dataService, DataFactory){
		$scope.error = '';

		if(DataFactory.currentCategory.category_id === undefined){
			$location.url('talk');
		}
		else{
			$scope.category = $.extend(true, {}, DataFactory.currentCategory);
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
			var config = {
				method : 'GET',
				url : 'http://prazor.com/rest/getPartners/entry/' + talk.entry_id
			}
			//reset subcategoies
			DataFactory.subCategories = {};

			dataService.getData(config).then(
				function(response){
					if(response.data.length && response.data[0].categories.length){
						DataFactory.subCategories = response.data[0];
						DataFactory.subCategory = talk;
						$location.url('talk/playlist');
					}
					else{
						DataFactory.subCategory = talk;
						$location.url('talk/playlist');
					}
					
				},function(error){
					console.log(error);
			});
		};
	}]);
})();