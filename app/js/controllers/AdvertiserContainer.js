'use strict';

app.controller('AdvertiserContainer', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	$scope.advertiserContaners = [];
	
	$scope.refresh = function () {

		var data = null;
		
		var aid = $routeParams.uAdvertiserId;

		data = $rootScope.get("getAdvertiserContainerByName", '', '', '', '', '', '', '', aid);

		data.then(function (data) {

			$scope.advertiserContaners = data.response.result;
			
			
			$scope.breadcrumbs.options = { 'Advertiser Containers': aid + ' Containers' };

		}, function (status) {

			if (angular.isUndefinedOrNull(status)) {

				return "Unable to process request";

			} else {

				return status;
			}

		});

	}
	
});
	

