'use strict';

angular.isUndefinedOrNull = function (val) {
	return angular.isUndefined(val) || val === null
}

angular.toStringIfIsUndefinedOrNull = function (val) {

	if (angular.isUndefinedOrNull(val)) {

		return "";

	}
	return val;

}
angular.getNames = function (data, dKey) {

	var names = [];

	if (!angular.isUndefinedOrNull(data) || data.length > 0) {
		angular.forEach(data, function (value, key) {
			angular.forEach(value, function (value1, key1) {

				if (key1 == dKey) {
					names.push(value1);
				}
			});

		});
	}

	return names;


}

angular.containsObject = function(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (angular.equals(list[i], obj)) {
            return true;
        }
    }

    return false;
};

app.run(function ($rootScope, $q, $templateCache, UtmMainService) {

	$rootScope.$on('$viewContentLoaded', function () {
		$templateCache.removeAll();
	});

	$rootScope.test = new Date();

	$rootScope.alert = {
		ok: {
			classes: "alert alert-block alert-success"
		},
		error: {
			classes: "alert alert-block alert-error"
		},
		msg: "",
		box: "",
		show: false

	};

	$rootScope.actionCodeOptions = {
		value: 'text',
		lineWrapping: true,
		readOnly: false,
		lineNumbers: true,
		mode: 'htmlmixed',
		onChange: 'reParseActionCodeInput'
	};

	$rootScope.steps = {step1: {show: true}, step2: {show: false}, step3: {show: false}, step4: {show: false}, step5: {show: false}};


	$rootScope.actionCodeJS = "test";
	$rootScope.actionCodePixel = "test";

	$rootScope.actionCodeJS_Url = "";
	$rootScope.actionCodePixel_Url = "";

	$rootScope.context = {menu: null};

	$rootScope.message = "Help section";
	$rootScope.sectionName = "";

	$rootScope.get = function (method, cid, rid, mid, maid, vid, fid, aid, aname) {

		var data = UtmMainService.get(method, cid, rid, mid, maid, vid, fid, aid, aname);
		var q = $q.defer();

		data.then(function (data) {
			console.log("get");
			q.resolve(data);
			//return data.response.result;


		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";
				q.reject(status);

			} else {
				q.reject(status);
				return status;
			}

		});

		return q.promise;
	}

	$rootScope.put = function (method, userData, cid, rid, mid, maid, vid, fid, aid) {

		var data = UtmMainService.put(method, userData, cid, rid, mid, maid, vid, fid, aid);
		var q = $q.defer();

		data.then(function (data) {
			console.log("get");
			q.resolve(data);
			//return data.response.result;


		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";
				q.reject(status);

			} else {
				q.reject(status);
				return status;
			}

		});

		return q.promise;
	}
});

app.controller('UtmMainController', function ($scope, $rootScope, $q, $route, $routeParams, $location, breadcrumbs, UtmMainService) {

	console.log("hello from UTM");
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;

	$scope.steps.step1.show = true;
	$scope.steps.step2.show = false;
	$scope.steps.step3.show = false;
	$scope.steps.step4.show = false;
	$scope.steps.step5.show = false;

	$scope.count = {containers: 0, rules: 0, modules: 0, macros: 0, functions: 0};
	
	$scope.breadcrumbs = breadcrumbs;
	
	$scope.refresh = function () {

		var data1 = null;

		data1 = $rootScope.get("getCounts", "", "", "", "");

		data1.then(function (data) {

			$scope.count.containers = data.response.result.containers;
			$scope.count.rules = data.response.result.rules;
			$scope.count.macros = data.response.result.macros;
			$scope.count.modules = data.response.result.modules;
			$scope.count.functions = data.response.result.functions;


		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";

			} else {

				return status;
			}

		});

	}

	$scope.check = function (id) {
		console.log("check " + id);

		if (id == null) {

			return false;
		} else {

			return true;
		}

	}
	
	$scope.goto = function(url){
		
		$location.path( url );
		
	}

//ContainerController.init();

});
