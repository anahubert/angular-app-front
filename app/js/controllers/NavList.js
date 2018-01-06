app.controller('NavList', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	console.log("hello from NavList");
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
	$scope.query = [];


	$scope.count = {containers: 0, rules: 0, modules: 0, macros: 0, functions: 0};

	$scope.refresh = function () {

		console.log("start refreshing");

		var data1 = null;

		data1 = $rootScope.get("getCounts", "", "", "", "", "", "");

		data1.then(function (data) {

			$scope.count.advertisers = data.response.result.advertisers;
			$scope.count.containers = data.response.result.containers;
			$scope.count.rules = data.response.result.rules;
			$scope.count.macros = data.response.result.macros;
			$scope.count.modules = data.response.result.modules;
			$scope.count.functions = data.response.result.functions;

			console.log("finish counts");

			parse();

		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";

			} else {

				return status;
			}

		});

	}

	var parse = function () {

		var q = $location.path().split('/');


		for (i = 0; i < q.length; i++) {

			var q1 = "";
			var q2 = "";
			
			if (i % 2 == 0 && i != 0) {

				q1 = q[i];

				if (i + 1 != q.length) {
					q2 = q[i + 1];
				}

				$scope.query.push(q1 + " " + q2);
			}

		}

		console.log(q);
		console.log($scope.query);

	}

//ContainerController.init();

});