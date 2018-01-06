'use strict';

app.controller('Macro', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	$scope.names = [];
	$scope.aliases = [];
	$scope.macros = [];
	$scope.rule_macros = [];
	
	
	$scope.macro =
	{
		id: null,
		name: "",
		alias: "",
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
				$scope.macro.clicked.add = true;
				$scope.macro.id = id;
				break;
			case "edit":
				$scope.macro.clicked.redit = true;
				$scope.macro.id = id;
				break;
			case "new":
				$scope.macro.clicked.rnew = true;
				$scope.macro.id = id;
				break;
			default:
				$scope.macro.id = null;
		}
		
		
	};
	
	$scope.close = function(){
		
		$scope.macro.clicked.rnew = false;
		$scope.macro.clicked.redit = false;
		
	}
	
	$scope.refresh = function(){
		
		var macros = $rootScope.get('getMacros','','','','','','');
		
		macros.then(function(data) {
			
			$scope.macros = data.response.result;
			
			$scope.names = angular.getNames($scope.macros, "name");
			$scope.aliases = angular.getNames($scope.macros, "alias");
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}
	
	$scope.save = function(userData){


		var data = $rootScope.put("saveMacro", userData, '', '', '', '');

		data.then(function(data) {

			console.log("Saving macro...");
			
			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Macro is created.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to save macro.";
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
	
	$scope.add = function(macro){
		
		console.log("adding macros");
		
		var newMacro = null;
		
		//console.log($scope.$parent.rule.macros);
		//console.log(macro);
		if($scope.rule.macros.indexOf(macro) != -1){
			
			newMacro = angular.copy(macro);
			
			$scope.rule.macros.push(newMacro);
			
		}else{
			
			$scope.rule.macros.push(macro);
			
		}
		
		//console.log($scope.$parent.rule.macros);
		
		
		
		
	}
	
	$scope.remove = function(index){
		
		$scope.rule.macros.splice(index, 1);
		
	}
	
	$scope.deletme = function(maid){
		
		console.log("Deleting macro " + maid);
		
		var data1 = $rootScope.get('deleteMacro', '', '', '', maid, '', '');

		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Macro is deleted.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to delete macro.";
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
	

});
