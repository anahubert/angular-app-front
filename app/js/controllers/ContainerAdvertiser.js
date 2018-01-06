'use strict';

app.controller('ContainerAdvertiser', function ($scope, $rootScope, $q, $route, $routeParams, $location, UtmMainService) {

	$scope.names = [];
	$scope.uides = [];
	$scope.advertisers = [];
	
	$scope.advertiser = [];
	
	console.log("Hello from advertisers ERTWETRTY");
	console.log($scope);
	
	$scope.container.advertiser =
	{
		id: null,
		name: "",
		uid: "",
		description: "",
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
	
	$scope.refresh = function(cid){
		
		var cadvertiser = $rootScope.get('getContainerAdvertiser',cid,'','','','','');
		
		cadvertiser.then(function(data) {
			
			$scope.container = data.response.result.container;
			
			//$scope.names = angular.getNames($scope.container.advertiser, "name");
			//$scope.uides = angular.getNames($scope.container.advertiser, "uid");
			
		}, function(status) {

			if(angular.isUndefinedOrNull(status)){

				return "Unable to process request";

			}else{

				return status;
				
			}

		});
		
		
	}
	
	$scope.save = function(userData){

		var data = $rootScope.put("saveContainer", userData);

		data.then(function(data) {

			console.log("Saving container advertiser...");
			
			if(data.response.status == 1){
				
				$scope.alert.box = $scope.alert.ok.classes;
				$scope.alert.msg = "Container is created.";
				$scope.alert.show = true;
				$scope.container.id = data.response.result.container.id;
				$scope.refresh($scope.container.id);
				
			}else{
				
				$scope.alert.box = $scope.alert.error.classes;
				$scope.alert.msg = "Unable to save Container.";
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
		
		console.log("adding advertisers");
		
		var newAdvertiser = null;
		
		//console.log($scope.$parent.rule.advertisers);
		//console.log(advertiser);
		if($scope.rule.advertisers.indexOf(advertiser) != -1){
			
			newAdvertiser = angular.copy(advertiser);
			
			$scope.rule.advertisers.push(newAdvertiser);
			
		}else{
			
			$scope.rule.advertisers.push(advertiser);
			
		}
		
		//console.log($scope.$parent.rule.advertisers);
		
		
		
		
	}
	
	$scope.remove = function(index){
		
		$scope.rule.advertisers.splice(index, 1);
		
	}
	
	$scope.deletme = function(aid){
		
		console.log("Deleting advertiser " + aid);
		
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
		console.log(uId);
		
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
	
	console.log(uId1);
	
		
		return uId1;
		
	}

});