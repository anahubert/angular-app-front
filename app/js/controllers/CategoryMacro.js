'use strict';

app.controller('CategoryMacro', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	$scope.categoryMacros =
			{
			};

	$scope.form = {
		cb_pt_macro: false

	}
	
	$scope.isChecked = false;
	
	//$scope.selected = [];
	$scope.descriptions = [];
	
	$scope.save = function(){

		var data = $rootScope.put("updateCategoryMacros", container);

		data.then(function(data) {
			
			if(data.response.status == 1){
				
				$rootScope.alert.box = $rootScope.alert.ok.classes;
				$rootScope.alert.msg = "Container updated.";
				$rootScope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$rootScope.alert.box = $rootScope.alert.error.classes;
				$rootScope.alert.msg = "Unable to update container.";
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
	
	
	$scope.refresh = function () {

		var categoryMacros = $rootScope.get('getCategoryMacros', '', '', '', '', '', '');

		categoryMacros.then(function (data) {

			$scope.categoryMacros = data.response.result;

			$scope.selected = $scope.container.macros;

			
		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";

			} else {

				return status;
			}

		});


	}

	$scope.add = function (macro) {

		if ($scope.container.macros.indexOf(macro) != -1) {

			$rootScope.alert.box = $rootScope.alert.error.classes;
			$rootScope.alert.msg = "Macro already added.";
			$rootScope.alert.show = true;

		} else {

			$scope.container.macros.push(macro);
			$rootScope.alert.show = false;

		}


	}

	$scope.remove = function (index) {

		$scope.container.macros.splice(index, 1);

		$rootScope.actionCodeJS = " ";

	}

	var inMacros = function(macro, macros){
		
		var tmp = [];
		
		for(var i = 0; i < macros.length; i++){
			
			var macro1 = macros[i];
			
			tmp[i] = macro1.id;
			
		}
		
		return tmp.indexOf(macro.id) === -1 ? false :  true;
		
	}
	var indexOfMacro = function(macros, macro){
		
		for(var i = 0; i < macros.length; i++){
			
			var macro1 = macros[i];
			
			if(macro.id == macro1.id){
				
				return i;
				
			}
			
		}
		
		return -1;
		
	}
	var updateSelected = function (action, macro) {
		
		if (action === 'add' && !inMacros(macro, $scope.container.macros)) {
			$scope.container.macros.push(macro);
		}
		if (action === 'remove' && inMacros(macro, $scope.container.macros)) {
			
			$scope.container.macros.splice(indexOfMacro($scope.container.macros, macro), 1);
		}
		
	};
	
	$scope.isChecked = function(macro){
		
		return inMacros(macro, $scope.container.macros);
		
	}

	$scope.updateSelection = function ($event, macro) {
		
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		
		console.log(action);
		updateSelected(action, macro);
		
		//$scope.container.macros = $scope.selected;
		
	};
	
	$scope.selectAll = function ($event) {
		
		var checkbox = $event.target;
		var action = (checkbox.checked ? 'add' : 'remove');
		
		for (var i = 0; i < $scope.entities.length; i++) {
			
			var entity = $scope.entities[i];
			updateSelected(action, entity);
			
		}
	};

	$scope.isSelectedAll = function () {
		
		return $scope.selected.length === $scope.entities.length;
		
	};
	
	$scope.updateDescription = function(macro){
		
		var id = macro.id;
		var desc = macro.description;
		var midx = null;
		
		midx = getMacroIndex(macro);
		
		if(!angular.isUndefinedOrNull(midx)){
			
			$scope.container.macros[midx].description = desc;
			
		}
		
		
	};
	
	var isObjInList = function(list, objKey, objVal){
		
		for (var i = 0; i < list.length; i++) {
			
			var obj = list[i];
			console.log("objects");
			console.log(obj);
			
			angular.forEach(obj, function (val, key) {

					console.log("val=" + val + " key=" + key);
					if(key == objKey && val == objVal){
						
						return true;
						
					}

				});
				return false;
			
			
		}
		
		
	}
	var getMacroIndex = function(macro){
		
		var id = macro.id;
		var midx = null;
		
		for (var i = 0; i < $scope.container.macros.length; i++) {
			
			if($scope.container.macros[i].id == id){
				
				midx = i;
			
			}
			
			
		}
		
		return midx;
		
	}

});
