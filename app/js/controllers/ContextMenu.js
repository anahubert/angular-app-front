'use strict';

app.controller('ContextMenu', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	$scope.set = function(action){
		
		$rootScope.context.menu = action;
		
	};
});

	