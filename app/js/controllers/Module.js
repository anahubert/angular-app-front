'use strict';

app.controller('Module', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	$scope.names = [];
	$scope.modules = [];
	$scope.rule_modules = [];
	
	$scope.module_functions = [];
	
	$scope.module =
		{
			id: null,
			name: "",
			entry: null,
			functions: [],
			code: " ",
			clicked: {
				add: 0,
				redit: false,
				rnew: false
			},
			fun: {toAdd: false}
			
		};
		
	console.log("Hello from Module");
	
	$scope.click = function(what, id){
		
		switch(what){
			case "add":
				$scope.module.clicked.add = true;
				$scope.module.id = id;
				break;
			case "edit":
				$scope.module.clicked.redit = true;
				$scope.module.id = id;
				break;
			case "new":
				$scope.module.clicked.rnew = true;
				$scope.module.id = id;
				break;
			default:
				$scope.module.id = null;
		}
		
		
	};
	
	$scope.refresh = function(){
		
		var modules = $rootScope.get('getModules','','', '', '');
	
		modules.then(function(data) {
			
			$scope.modules = data.response.result;
			
			
			$scope.names = angular.getNames($scope.modules, "name");
			$scope.module.clicked.rnew = false;
			$scope.module.clicked.redit = false;
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}
	
	$scope.save = function(userData, containerId, ruleId){

		console.log("Saving module...");
		
		console.log(userData);
		
		var data = $rootScope.put("addModule", userData, containerId, ruleId, '', '');

		data.then(function(data) {
			
			if(data.response.status == 1){
				
				$rootScope.alert.box = $rootScope.alert.ok.classes;
				$rootScope.alert.msg = "Module created.";
				$rootScope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$rootScope.alert.box = $rootScope.alert.error.classes;
				$rootScope.alert.msg = "Unable to save module.";
				$rootScope.alert.show = true;
				
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
		}
		);
	}
	
	$scope.setActionCode = function (mid){
		
		var modules = [];
		
		console.log("setting module action code for mid: " +  mid);
		
			modules = $rootScope.get('getModuleFunctionsCode','','', mid, '');
			
			modules.then(function(data) {
			
				$rootScope.actionCodeJS = data.response.result;
			
			}, function(status) {

				if(angular.isUndefinedOrNull(status)){

					return "Unable to process request";

				}else{

					return status;
				}

			});
		
		
	}
	
	$scope.rearange = function (){
		
		
	}
	
	$scope.add = function(module){
		
		console.log("adding modules");
		
		if($scope.rule.modules.indexOf(module) != -1){
			
			$rootScope.alert.box = $rootScope.alert.error.classes;
			$rootScope.alert.msg = "Module function already added.";
			$rootScope.alert.show = true;
			
		}else{
			
			$scope.rule.modules.push(module);
			$rootScope.alert.show = false;
			
		}
		
		
	}
	
	$scope.remove = function(index){
		
		$scope.rule.modules.splice(index, 1);
		
		$rootScope.actionCodeJS = " ";
		
	}
	
	$scope.edit = function(userData, moduleId){
		
		console.log("Editing module..");
		console.log(userData);
		// userData.name, 
		/*
		 * userData.module.id
		 * userData.macro.id
		 * 
		 * 
		 */
		
		
		userData.code = $rootScope.actionCodeJS;
		
		var data1 = $rootScope.put("editModule", userData, '', '', moduleId, '', '', '');	
			
		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Module edited.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to edit module.";
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
			angular.forEach($scope.modules, function(mod, mod_idx){
				
				if(mod.id == id){
					
					$scope.module.id = mod.id;
					$scope.module.name = mod.name;
					$scope.module.functions = mod.functions;
					$scope.module.entry = mod.is_entry;
				}
				
			});
		}
		
		console.log("End filling");
	}
	
	
	$scope.deletme = function(mid){
		
		console.log("Deleting module " + mid);
		
		var data1 = $rootScope.get('deleteModule', '', '', mid, '', '', '');

		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Module is deleted.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to delete module.";
				$scope.alert.show = true;
				$scope.refresh();
				
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
	
});