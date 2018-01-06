'use strict';

app.controller('Version', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	console.log("Hello from Version");
	console.log($scope);
	
	$scope.refresh = function(){
		
		var data = null;

		data = $rootScope.get("getVersions", "", "", "", "", "");

		data.then(function(data) {

			$scope.versions = data.response.result; 
			

		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
	};
});
