'use strict';

app.controller('JSCodeCtrl', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {


	$scope.init = function(){
		$scope.actionCodeJS =  "<script></script>";
	}
	
	$scope.remove = function(){

		$rootScope.actionCodeJS =  " ";
		$rootScope.actionCodePixel =  " ";
	
		$scope.downloadUrl = "test";
	}
	
	$scope.download = function(filename, type){
		
		var code = "";
		
		switch(type){
			case "jscript":
				code = $rootScope.actionCodeJS;
				break;
			case "interface":
				code = $rootScope.actionCodePixel;
				break;
			default:
				break;
		}
		
		var postData = {
			"htmlCode" : code, 
			"filename" : filename
		};
		

		var data = $rootScope.put("exportContainer", postData);

		data.then(function(data) {

			if(data.response.status == 1){
				
				$scope.downloadUrl = data.response.result.download;
				
				
			}else{
				
				
				
			}
			

		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				$rootScope.alert.box = $rootScope.alert.error.classes;
				$rootScope.alert.msg = "Unable to process request.";
				$rootScope.alert.show = true;

			}else{

				$rootScope.alert.box = $rootScope.alert.error.classes;
				$rootScope.alert.msg = "Server problem.";
				$rootScope.alert.show = true;
			}

		});
		
	}
	
	$scope.change = function(){
		
		$rootScope.actionCodeJS = $scope.actionCodeJS;
		
		
	}
	
});
