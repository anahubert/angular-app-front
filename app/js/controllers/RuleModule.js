'use strict';

app.controller('RuleModule', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	/*$scope.ruleModules = [{
		'id' : 0,
		'name': '', 
		'added': false
	}];*/
	
	$scope.ruleModules = [];
	
	console.log("Hello from RuleModule");
	console.log($scope);
	
	$scope.refresh = function(){
		
		var ruleModules = $rootScope.get('getRuleModules','','');
		
		ruleModules.then(function(data) {
			
			$scope.ruleModules = data.response.result;
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}
	
	$scope.addInputModule = function($index){
		
		$scope.ruleModules.push({
			'id' : 0,
			'name' : '', 
			'added' : false
		});
		$scope.ruleModules[$index]['added'] = true;
	}
	
	$scope.removeInputModule = function($index){
		
		$scope.ruleModules.splice($index, 1);
		
	}
	
	$scope.add = function(module){
		
		$scope.ruleModules.push(module);
		
	}
	
	$scope.remove = function(index){
		
		$scope.ruleModules.splice(index, 1);
		
	}
	
});