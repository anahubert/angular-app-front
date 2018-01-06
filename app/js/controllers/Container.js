'use strict';

app.controller('Container', function ($scope, $rootScope, $q, $route, $routeParams, $location, $filter, UtmMainService) {

	$scope.containers = [];
	$scope.names = [];
	$scope.rules = [];
	$scope.macros = [];

	$scope.uContainerId = $routeParams.uContainerId;

	$scope.sectionName = "Container";

	$scope.rule = {
		clicked: {
			add: false
		}
	};

	$scope.container =
			{
				id: null,
				name: "",
				advertiser: {
					id: null
				},
				macros: [{
						id: null,
						idx: null
					}],
				rules: [{
						id: null,
						idx: null
					}],
				clicked: {
					add: 0
				},
				selected: {
					id: null
				}

			};

	$scope.click = function (what, id, idx) {

		switch (what) {
			case "redit":
				$scope.container.clicked.redit = true;
				$scope.container.id = $scope.containers[idx].container_id;
				$scope.container.name = $scope.containers[idx].container_name;
				$scope.container.advertiser.id = $scope.containers[idx].advertiser_id;
				break;
			case "addRule":
				$scope.rule.clicked.add = true;
				break;
			case "newRule":
				$scope.rule.clicked.rnew = true;
				break;
			case "editRule":

				$scope.rule.selected.id = id;
				break;
			default:
		}


	};

	$scope.refresh = function (cid) {

		var data = null;
		
		var cid = $routeParams.uContainerId;

		data = $rootScope.get("getContainers", angular.toStringIfIsUndefinedOrNull(cid));

		data.then(function (data) {

			$scope.containers = data.response.result;
			
			//Container Edit
			if(!angular.isUndefinedOrNull($routeParams.uContainerId) && $scope.containers.length == 1){
				
				$scope.container = $scope.containers[0];
				$scope.breadcrumbs.options = { 'Container Edit': '' + $scope.container.name + '' };
				
			}
			

		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";

			} else {

				return status;
			}

		});

	}


	$scope.save = function (userData) {

		var data = $rootScope.put("saveContainer", userData);

		data.then(function (data) {


			if (data.response.status == 1) {

				$scope.alert.box = $scope.alert.ok.classes;
				$scope.container.id = data.response.result.container.id;
				$scope.container.macros = data.response.result.container.macros;
				$scope.container.rules = data.response.result.container.rules;

				$scope.alert.msg = "Container " + $scope.container.id + " created.";
				$scope.alert.show = true;

				//	$scope.refresh();

			} else {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to save container ";
				$scope.alert.show = true;

			}



		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to process request.";
				$scope.alert.show = true;

			} else {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Server problem.";
				$scope.alert.show = true;
			}
		}
		);
	}

	$scope.edit = function (cid, userData) {

		var userData = $scope.container;
		var data = $rootScope.put("editContainer", userData);

		data.then(function (data) {


			if (data.response.status == 1) {

				$scope.alert.box = $scope.alert.ok.classes;
				$scope.container.id = data.response.result.container.id;
				$scope.container.macros = data.response.result.container.macros;
				$scope.container.rules = data.response.result.container.rules;

				$scope.alert.msg = "Container " + $scope.container.id + " updated.";
				$scope.alert.show = true;

				//	$scope.refresh();

			} else {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to save container ";
				$scope.alert.show = true;

			}



		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to process request.";
				$scope.alert.show = true;

			} else {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Server problem.";
				$scope.alert.show = true;
			}
		}
		);
	}

	$scope.setActionCode = function (cid, cidx) {

		console.log("Set container action code for " + cid);

		var ruleCode = $rootScope.get('getContainerCode', cid, '', '', '');

		ruleCode.then(function (data) {

			$rootScope.actionCodeJS = " " + data.response.result;

			$scope.setDownloadUrl($scope.containers[cidx].advertiser_name, 'jscript');

		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";

			} else {

				return status;
			}

		});

	}

	$scope.setActionCodePixel = function (cid, cidx) {

		var ruleCode = $rootScope.get('getContainerPixelCode', cid, '', '', '');

		ruleCode.then(function (data) {

			$rootScope.actionCodePixel = " " + data.response.result;
			$scope.setDownloadUrl($scope.containers[cidx].advertiser_name, 'interface');

		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";

			} else {

				return status;
			}

		});

	}

	$scope.copy = function (index) {

		console.log("copying container... " + index);
		console.log($scope.containers[index]);

		var data = $scope.containers[index];
		var rules = data.rules;
		var container = {};

		var container_id = data.container_id;

		var container = {
			"name": data.container_name,
			"advertiser": data.advertiser_id,
			"rules": rules
		};

		//console.log(rules);
		$scope.save(container, container_id, '', '', '', '', '');

	}

	$scope.fill = function (rule_id) {

		var modules = [];
		var macros = [];
		var newModule = {};
		var newMacro = {};

		angular.forEach($scope.rules.rules, function (rule, id) {

			if (rule.data.rule_id == rule_id) {

				$scope.rule.id = rule_id;
				$scope.rule.name = rule.data.rule_name;
				$scope.rule.type = rule.data.rule_type;

				angular.forEach(rule.modules, function (module, id) {

					newModule.id = module.module_id;
					newModule.name = module.module_name;
					newModule.code = module.module_code;

					this.push(newModule);

				}, modules);

				angular.forEach(rule.macros, function (macro, id) {


					newMacro.id = macro.macro_id;
					newMacro.name = macro.macro_name;
					newMacro.alias = macro.macro_alias;

					if (macros.indexOf(newMacro) != -1) {

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

	$scope.setDownloadUrl = function (adv, type) {

		var code = "";
		var filename = "";


		switch (type) {
			case "jscript":
				code = $rootScope.actionCodeJS;
				filename = adv + ".html";
				break;
			case "interface":
				code = $rootScope.actionCodePixel;
				filename = "impl_" + adv + ".html";
				break;
			default:
				break;
		}

		var postData = {
			"htmlCode": code,
			"filename": filename
		};


		var data = $rootScope.put("exportContainer", postData);

		data.then(function (data) {

			if (data.response.status == 1) {

				switch (type) {
					case "jscript":
						$rootScope.actionCodeJS_Url = data.response.result.download;
						break;
					case "interface":
						$rootScope.actionCodePixel_Url = data.response.result.download;
						break;
					default:
						break;
				}


			} else {



			}


		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				$rootScope.alert.box = $rootScope.alert.error.classes;
				$rootScope.alert.msg = "Unable to process request.";
				$rootScope.alert.show = true;

			} else {

				$rootScope.alert.box = $rootScope.alert.error.classes;
				$rootScope.alert.msg = "Server problem.";
				$rootScope.alert.show = true;
			}

		});

	}

	$scope.deletme = function (cid) {

		console.log("Deleting container " + cid);

		var data1 = $rootScope.get('deleteContainer', cid, '', '', '');

		data1.then(function (data) {

			if (data.response.status == 1) {

				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Container deleted.";
				$scope.alert.show = true;
				$scope.refresh();

			} else {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to delete container.";
				$scope.alert.show = true;

			}



		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to process request.";
				$scope.alert.show = true;

			} else {

				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Server problem.";
				$scope.alert.show = true;
			}
		}
		);

	}


});