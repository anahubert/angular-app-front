'use strict';

app.controller('ContainerRule', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	$scope.save = function(containerId, userData){

		var data = $rootScope.put("addContainerRule", userData, containerId, '', '', '');

		data.then(function(data) {

			console.log("Saving container rules...");
			
			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Container rules added.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to save container rules.";
				$scope.alert.show = true;
				
			}
			


		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to process request.";
				$scope.alert.show = true;

			}else{

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Server problem.";
				$scope.alert.show = true;
			}
		}
		);
	}
	
	$scope.setActionCodeRule = function (rid){

		var ruleCode = $scope.$parent.$parent.get('getRuleCode','', rid);

		ruleCode.then(function(data) {

			$scope.$parent.$parent.actionCodeJS = data.response.result;
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});

	}
	
	$scope.setActionCodePixelRule = function (rid){

		
		var ruleCode = $scope.$parent.$parent.get('getRulePixelCode','', rid);

		ruleCode.then(function(data) {

			$scope.$parent.$parent.actionCodePixel = data.response.result;
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});

	}
	

});
