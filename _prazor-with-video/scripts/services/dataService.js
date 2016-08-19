
	app.service('dataService', ['$http', '$q', '$location', '$templateCache', function($http, $q, $location, $templateCache){
		
		this.getData = function(config){
			var deferred = $q.defer();
			$http({
				method: config.method, 
				url: config.url, 
				cache: $templateCache,
				headers: {
				  'Content-Type': 'application/json'
				},
			})
				.then(					
					function(response) {
						if(response.data){
							deferred.resolve(response);
						}
						else{
							deferred.reject('Error Fetching Data');
						}
					}, 
					function(error) {
						deferred.reject(error);
					});
			
			return deferred.promise;
		};



		// fetches the m3u file to fetch the audio stream
		this.getM3U = function(station){
			var promise = $http({
					method: "GET",
					url: "http://prazor.com/streams/" + station +".m3u",
					headers: { 'Content-Type': 'audio/x-mpegurl' },
				});

			return promise;
		};



		this.getPlaylistDetails = function(config){
			var deferred = $q.defer();

			$http({
				method: config.method,
				url: config.url,
				cache: false,
				headers: {
					'Content-Type': 'text/plain'
				}
			})
			.then(					
					function(response) {
						if(response.data){
							deferred.resolve(response);
						}
						else{
							deferred.reject('Error Fetching Data');
						}
					}, 
					function(error) {
						deferred.reject(error);
					});

			return deferred.promise;
		}
		
	}]);

app.factory('DataSource', ['$http', '$q', function($http, $q){
       return {
           get: function(config,callback,transform){
           		var deferred = $q.defer();
                $http.get(
                    config.url,
                    {
                    	transformResponse : function(data) {
	                        var x2js = new X2JS();
	                        var json = x2js.xml_str2json(data);
	                        return json;
	                    }
                    }
                ).
                success(function(data, status) {
                    console.log("Request succeeded");
                    deferred.resolve(data);
                }).
                error(function(data, status) {
                    console.log("Request failed " + status);
                    deferred.reject(data);
                });
                return deferred.promise;
           }
       };
    }]);

app.factory('DataFactory', function(){
	var publicApi = {};

	publicApi.categories = {};
	publicApi.currentCategory ={};
	publicApi.subCategories = {};
	publicApi.subCategory = {};
	publicApi.currentLesson = {};
	publicApi.genre = {};
	publicApi.station = {};
	publicApi.currentStation = {
		genre : {},
		station : {},
		stations : {},
		$index : {}
	};

	return publicApi;
});