(function(){
	app.controller('TeachingController', ['$scope', '$location', 'dataService', 'DataFactory', 
		function($scope, $location, dataService, DataFactory){
		$scope.error = '';

		function getCategories(categoryID){
			var config = {
				method : 'GET',
				url : 'http://prazor.com/rest/getPartners/category/' + categoryID
			}

			dataService.getData(config).then(
				function(response){
					if(!$scope.data){
						$scope.data = response.data;
					}
					else{
						$scope.data_subcategory = response.data;
						$timeout(function(){
							if($('.multiple-items').hasClass('slick-initialized')){
								$('.multiple-items').slick('unslick');
							}
							$('.multiple-items').slick({
								  infinite: false,
								  slidesToShow: ($(window).width() < 500) ? 2 : 3,
								  slidesToScroll: ($(window).width() < 500) ? 2 : 3,
								  arrows: true
								});
						}, 10);
					}
				},function(error){
					console.log(error);
				});	
		}

		function getSubCategories(categoryID){
			var config = {
				method : 'GET',
				url : 'http://prazor.com/rest/getPartnerCategories/get_subcategory/' + categoryID
			}

			dataService.getData(config).then(
				function(response){
					if(response.data.category[0].subCategories.length){
						$scope.subcatData = response.data.category[0].subCategories;
						getCategories($scope.subcatData[0].category_id);
					}else{
						console.log('No Subcategories');
					}
				},function(error){
					console.log(error);
				});	
		}

		function init(){
			if(DataFactory.currentCategory.category_id === undefined){
				$location.url('teaching');
			}
			else{
				$scope.category = $.extend(true, {}, DataFactory.currentCategory);
				getCategories($scope.category.category_id);
				getSubCategories($scope.category.category_id);	
			}	
		}
		init();

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
					}
					DataFactory.subCategory = teaching;
					$location.url('teaching/playlist');
					
				},function(error){
					console.log(error);
			});	
		};

		$scope.getSubcategories = function(category){
			getCategories(category.category_id);
		}
	}]);
})();