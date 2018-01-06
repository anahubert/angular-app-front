'use strict';

app.controller('Category', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {
	
	$scope.category =
	{
		id: null,
		name: ""
			
	};
	
	$scope.refresh = function(){
		
		var categories = $rootScope.get('getCategories','','','','','','');
		
		categories.then(function(data) {
			
			$scope.categories = data.response.result;
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}
	
});