'use strict';

app.controller('Advertiser', function ($scope, $rootScope, $q, $route, $routeParams, $location, $filter, UtmMainService) {

	$scope.names = [];
	$scope.uides = [];
	$scope.advertisers = [];
	
	$scope.advertiser = [];
	
	$scope.showAdvertiserContainers = false;
	
	$scope.advertiser =
	{
		id: null,
		name: "",
		uid: "",
		clicked: {
			rnew: false,
			redit: false
		},
		selected: {
			id: null
		}
			
	};
	
	$scope.containers = [];
	
	$scope.click = function(what, id){
		
		switch(what){
			case "add":
				$scope.advertiser.clicked.add = true;
				$scope.advertiser.id = id;
				break;
			case "edit":
				$scope.advertiser.clicked.redit = true;
				$scope.advertiser.id = id;
				break;
			case "new":
				$scope.advertiser.clicked.rnew = true;
				$scope.advertiser.id = id;
				break;
			default:
				$scope.advertiser.id = null;
		}
		
		
	};
	
	$scope.close = function(){
		
		$scope.advertiser.clicked.rnew = false;
		$scope.advertiser.clicked.redit = false;
		
	}
	
	$scope.refresh = function(){
		
		var advertisers = $rootScope.get('getAdvertisers','','','','','','');
		
		advertisers.then(function(data) {
			
			$scope.advertisers = data.response.result;
			
			$scope.advertiserNamesList = groupByName($scope.advertisers);
			
			$scope.names = angular.getNames($scope.advertisers, "name");
			$scope.uides = angular.getNames($scope.advertisers, "uid");
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
			}

		});
		
		
	}
	
	$scope.save = function(userData){

		var data = $rootScope.put("saveAdvertiser", userData, '', '', '', '');

		data.then(function(data) {

			
			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Advertiser is created.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to save advertiser.";
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
	
	$scope.add = function(advertiser){
		
		
		var newAdvertiser = null;
		
		if($scope.rule.advertisers.indexOf(advertiser) != -1){
			
			newAdvertiser = angular.copy(advertiser);
			
			$scope.rule.advertisers.push(newAdvertiser);
			
		}else{
			
			$scope.rule.advertisers.push(advertiser);
			
		}
		
		
	}
	
	$scope.remove = function(index){
		
		$scope.rule.advertisers.splice(index, 1);
		
	}
	
	$scope.deletme = function(aid){
		
		//method, userData, cid, rid, mid, maid, vid, fid, aid
		var data1 = $rootScope.put('deleteAdvertiser', aid, '', '', '', '', '', '', '');

		data1.then(function(data) {

			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Advertiser is deleted.";
				$scope.alert.show = true;
				$scope.refresh();
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to delete advertiser.";
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
	
	
	$scope.getAdvertiserName = function(uId){
		
		var uName = "";
		
		angular.forEach($scope.advertisers, function(advertiser, index){
			
			if(uId == advertiser.id){
				
				uName = advertiser.name;
				
			}
		});
		
		return uName;
		
	}
	
	$scope.getAdvertiserUid = function(uId){
		
		var uId1 = "";
		
		angular.forEach($scope.advertisers, function(advertiser, index){
			
			if(uId == advertiser.id){
				
				uId1 = advertiser.uid;
				
			}
		});
	
		
		return uId1;
		
	}
	
	$scope.getAdvertiserIndex = function(uId){
		
		var uId1 = "";
		
		angular.forEach($scope.advertisers, function(advertiser, index){
			
			if(uId == advertiser.id){
				
				uId1 = index;
				
			}
		});
	
		return uId1;
		
	}
	
	var groupByName = function (list) {

		var newList = [];

		angular.forEach(list, function (item, index) {

			if($filter('filter')(newList, {name: item.name}).length == 0){
				
				newList.push(item);
				
			}


		});
		
		return newList;

	}

});