'use strict';

app.controller('ModuleFunction', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	console.log("Hello from ModuleFunction");
	
	$scope.module = {
		functions: []
	};
	
	$scope.refresh = function(){
		
		var modules = $rootScope.get('getModuleFunctions','','', '', '', '', '');
	
		modules.then(function(data) {
			
			$scope.module.functions = data.response.result;
			
			
			$scope.names = angular.getNames($scope.module.functions, "name");
			
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}
	
	$scope.getFunctions = function(mid){
		console.log("Hello from getFunctions");
		var functions = [];
		
		angular.forEach($scope.module.functions, function(value, key){
			console.log(value.module_id);
			if(value.module_id == mid){
				
				var fid = value.function_id;
				
				if(functions.indexOf(fid) == -1){
					functions.push(value); 
				}
				
				
			}
		});
		console.log(functions)
	}
		
});