'use strict';

app.controller('Function', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	$scope.names = [];
	$scope.functions = [];
	$scope.fcodes = " ";
	$scope.module_functions = [];
	
	console.log("Hello from functions");
	console.log($scope);
	
	$scope.fun =
	{
		id: null,
		name: "",
		code: "",
		clicked: {
			rnew: false,
			redit: false
		},
		selected: {
			id: null
		}
			
	};
	
	$scope.click = function(what, id){
		
		switch(what){
			case "add":
				$scope.fun.clicked.add = true;
				$scope.fun.id = id;
				break;
			case "edit":
				$scope.fun.clicked.redit = true;
				$scope.fun.id = id;
				break;
			case "new":
				$scope.fun.clicked.rnew = true;
				$scope.fun.id = id;
				$rootScope.actionCodeJS = " ";
				break;
			default:
				$scope.fun.id = null;
		}
		
		
	};
	
	$scope.close = function(){
		
		$scope.fun.clicked.rnew = false;
		$scope.fun.clicked.redit = false;
		$rootScope.actionCodeJS = " ";
		
	}
	
	$scope.refresh = function(){
		
		var functions = $rootScope.get('getFunctions','','','','', '', '');
		
		functions.then(function(data) {
			
			$scope.functions = data.response.result;
			
			$scope.names = angular.getNames($scope.functions, "name");
			
			$scope.fun.clicked.rnew = false;
			$scope.fun.clicked.redit = false;
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}
	
	$scope.save = function(userData){

		userData.code = $rootScope.actionCodeJS;
			
		var data1 = $rootScope.put("addFunction", userData, '', '', '', '', '', '');

		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Function is created.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to save function.";
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
	
	$scope.add = function(mFunction){
		
		console.log("adding functions");
		
		if($scope.module_functions.indexOf(mFunction) != -1){
			
			$scope.alert.box = $scope.alert.error.classes;
			$scope.alert.msg = "Module function already added.";
			$scope.alert.show = true;
			$scope.refresh();
			
		}else{
			
			$scope.module_functions.push(mFunction);
			$scope.alert.show = false;
			
		}
		
		$scope.$parent.module.functions=$scope.module_functions;
		
		console.log("module debug");
		console.log($scope.$parent.module);
	}
	
	$scope.remove = function(index){
		
		$scope.module_functions.splice(index, 1);
		$scope.$parent.module.functions=$scope.module_functions;
		
	}
	
	$scope.edit = function(userData, functionId){
		
		console.log("Editing function..");
		console.log(userData);
		// userData.name, 
		/*
		 * userData.module.id
		 * userData.macro.id
		 * 
		 * 
		 */
		
		
		userData.code = $rootScope.actionCodeJS;
		
		var data1 = $rootScope.put("editFunction", userData, '', '', '', '', '', functionId);	
			
		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Function edited.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to edit function.";
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
	
	$scope.fill = function(id){
		
		console.log("Start filling");
				
		$rootScope.actionCodeJS = " ";
		
		if(!angular.isUndefinedOrNull(id)){
			angular.forEach($scope.functions, function(fun, fun_idx){
				
				if(fun.id == id){
					
					$scope.fun.id = fun.id;
					$scope.fun.name = fun.name;
					$rootScope.actionCodeJS = "<script>\n" + fun.code + "</script>";
	
				}
				
			});
		}
		
		console.log("End filling");
	}
	
	
	$scope.deletme = function(fid){
		
		console.log("Deleting fun " + fid);
		
		var data1 = $rootScope.get('deleteFunction', '', '', '', '', '', fid);

		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Function is deleted.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to delete function.";
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
	
	$scope.toggleSelection = function toggleSelection(mFunction) {
		
		console.log("Toggle Selection");
		
		var idx = $scope.module.functions.indexOf(mFunction);
      
		// is currently selected
		if (idx > -1) {
			$scope.module.functions.splice(idx, 1);
		}
      
		// is newly selected
		else {
			$scope.module.functions.push(mFunction);
		}
	};
	

});
