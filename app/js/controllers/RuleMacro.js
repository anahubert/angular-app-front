'use strict';

app.controller('RuleMacro', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	/*$scope.ruleMacros = [{
		'id' : 0,
		'name': '', 
		'added': false
	}];*/

	$scope.nRuleMacros = [];
	
	console.log("Hello from RuleMacros");
	console.log($scope);
	
	$scope.refresh = function(){
		
		var ruleMacros = $rootScope.get('getRuleMacros','','');
		
		ruleMacros.then(function(data) {
			
			$scope.ruleMacros = data.response.result;
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}

	$scope.addInputMacro = function($index){
		
		$scope.ruleMacros.push({
			'id' : 0,
			'name' : '', 
			'added' : false
		});
		$scope.ruleMacros[$index]['added'] = true;
	}
	
	$scope.removeInputMacro = function($index){
		
		$scope.ruleMacros.splice($index, 1);
		
	}
	
});