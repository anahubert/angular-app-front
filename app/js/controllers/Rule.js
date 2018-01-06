'use strict';

app.controller('Rule', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {


	$scope.names = [];
	$scope.rules = [];
	
	$scope.macros = [];
	$scope.modules = [];
	
	$scope.sectionName = "Rule";
	
	$scope.container_rules = [];
	
		
	$scope.filename = "test_filename.html";
	$scope.filename_px = "test_filename.html";
	
	$scope.rule =
	{
		id: null,
		name: "",
		modules: [],
		macros: [],
		functions: [{
			id: null
		}],
		clicked: {
			add: 0
		},
		selected: {
			id: null
		}
			
	};
		
	$scope.predicate = 'rule_id';
	$scope.reverse = true;
	
	$scope.new_rules = [];
		
	console.log("Hello from rule1");
	
	$scope.click = function(what, id){
		
		switch(what){
			case "addRule":
			$scope.rule.clicked.add = true;
			$scope.rule.id = id;
			break;
			case "editRule":
			$scope.rule.clicked.redit = true;
			$scope.rule.id = id;
			break;
			case "newRule":
			$scope.rule.clicked.rnew = true;
			$scope.rule.id = id;
			break;
			default:
				$scope.rule.id = null;
		}
		
		
	};
	
	$scope.cleanAC = function(){
		
		$scope.actionCodeJS = " ";
		$scope.actionCodePixel = " ";
		
	}
	
	$scope.refresh = function(){
		
		var rules = $rootScope.get('getRulesModulesMacros','','', '', '');
		var name = "";
		var names = [];
		var newRules = [];
		
		rules.then(function(data) {
			
			$scope.rules = data.response.result;
			console.log("getRules");
			//console.log($scope.rules);
			newRules = $scope.rules.rules;
			
			angular.forEach(newRules, function(rule, id){
				
				name = rule.data.rule_name;
				
				this.push(name);
				
			}, names);
			
			console.log("names");
			
			$scope.names = angular.copy(names);
			
			names = null;
			$scope.rule.clicked.rnew = false;
			$scope.rule.clicked.redit = false;
			//console.log($scope.names);
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}
	
	$scope.edit = function(userData, containerId, ruleId){
		
		console.log("Editing rule..");
		console.log(userData);
		// userData.name, 
		/*
		 * userData.module.id
		 * userData.macro.id
		 * 
		 * 
		 */
		
		var data1 = $rootScope.put("editRule", userData, containerId, ruleId, '', '');

		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Rule edited.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to edit rule.";
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
	
	$scope.save = function(userData, containerId, ruleId){

		console.log("Saving rule..");
		console.log(userData);
		// userData.name, 
		/*
		 * userData.module.id
		 * userData.macro.id
		 * 
		 * 
		 */
		
		var data1 = $rootScope.put("addRule", userData, containerId, ruleId, '', '');

		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Rule created.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to save rule.";
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
	
	$scope.setActionCode = function (rid){

		console.log("Set rule action code for " + rid);
		
		var ruleCode = $rootScope.get('getRuleCode', '', rid, '', '');

		ruleCode.then(function(data) {

			$rootScope.actionCodeJS = " " + data.response.result;
			$scope.filename = rid + "_container.html";
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});

	}
	
	$scope.setActionCodePixel = function (rid){

		console.log("Set rule pixel code for " + rid);

		var ruleCode = $rootScope.get('getRulePixelCode', '', rid, '', '');

		ruleCode.then(function(data) {
			
			$rootScope.actionCodePixel = " " + data.response.result;
			$scope.filename_px = rid + "_container_pixel.html";
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});

	}
	
	
	$scope.add = function(rule){
		
		console.log("adding rules");
		
		if($scope.container.rules.indexOf(rule) != -1){
			
			$rootScope.alert.box = $rootScope.alert.error.classes;
			$rootScope.alert.msg = "Module function already added.";
			$rootScope.alert.show = true;
			
		}else{
			
			console.log($scope.container.rules);
			$scope.container.rules.push(rule);
			
			//$scope.$parent.$parent.rules = angular.copy($scope.container_rules);
			
			$rootScope.alert.show = false;
			
		}
		
		
	}
	
	$scope.remove = function(index){
		
		console.log("removing " + index + "...");
		
		$scope.container.rules.splice(index, 1);
		$scope.rule.clicked.add = true;
		//$scope.$parent.$parent.rules = angular.copy($scope.container_rules);
		
		$rootScope.actionCodeJS = " ";
		
	}
	
	$scope.copy = function(rule_id){
		
		console.log("Selected rule: " + rule_id);
		
		var data = $scope.rules.rules[rule_id].data;
		var old_modules = $scope.rules.rules[rule_id].modules;
		var old_macros = $scope.rules.rules[rule_id].macros;
		
		var modules = [];
		var macros = [];
		
		angular.forEach(old_modules, function(module, id){
				
			modules.push({
				"id": module.module_id
			});
				
		});
		angular.forEach(old_macros, function(macro, id){
				
			macros.push({
				"id": macro.macro_id
			});
				
		});
		
		var rules = {
			"id": rule_id,
			"name": data.rule_name, 
			"type": data.rule_type, 
			"modules" : modules, 
			"macros" : macros
		};
		
		//console.log(rules);
		$scope.save(rules, '', '');
		
	}
	
	$scope.fill = function(rule_id){
		
		var modules = [];
		var macros = [];
		var newModule = {};
		var newMacro = {};
		
		angular.forEach($scope.rules.rules, function(rule, id){
				
			if(rule.data.rule_id == rule_id){
					
				$scope.rule.id = rule_id;
				$scope.rule.name = rule.data.rule_name;
				$scope.rule.type = rule.data.rule_type;
					
				angular.forEach(rule.modules, function(module, id){
						
					newModule.id = module.module_id;
					newModule.name = module.module_name;
					newModule.code = module.module_code;
						
					this.push(newModule);
						
				}, modules);
					
				angular.forEach(rule.macros, function(macro, id){
						
						
					newMacro.id = macro.macro_id;
					newMacro.name = macro.macro_name;
					newMacro.alias = macro.macro_alias;
						
					if(macros.indexOf(newMacro) != -1){
							
						newMacro = angular.copy(newMacro);
							
					}
						
					this.push(newMacro);
						
				}, macros);
					
				console.log(macros);
					
				$scope.rule.modules = modules;
				$scope.rule.macros = macros;
				
						
			}
				
		});
	}
	
	$scope.deletme = function(rid){
		
		console.log("Deleting rule " + rid);
		
		var data1 = $rootScope.get('deleteRule', '', rid, '', '');

		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Rule deleted.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to delete rule.";
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
