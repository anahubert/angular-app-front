'use strict';

app.service('UtmMainService', function ($http, $q) {
	
	this.get = function(method, cid, rid, mid, maid, vid, fid, aid, aname, userData){
		
		var q = $q.defer();
		
		var url = '/rest/?action=' + method + '&cid=' + cid + "&rid=" + rid + '&mid=' + mid + "&maid=" + maid + "&vid=" + vid + "&fid=" + fid + "&aid=" + aid + "&aname=" + aname;
	
		$http.get(url)
		.success(function(data, status, headers, config){
			
			console.log("Success in " + url);
	
			q.resolve(data);
			
	
		})
		.error(function(data, status, headers, config){
			
			q.reject(status);
			
			console.log("Error in " + url);
			
		});
		
		return q.promise;
		
	};
	//method, userData, cid, rid, mid, maid, vid, fid, aid
	this.put = function(method, userData, containerId, ruleId, moduleId, macroId, versionId, functionId, advertiserId){

		
		var q = $q.defer();
		var url = '/rest/?action=' + angular.toStringIfIsUndefinedOrNull(method) + "&cid=" + 
				angular.toStringIfIsUndefinedOrNull(containerId) + "&rid=" + 
				angular.toStringIfIsUndefinedOrNull(ruleId) + "&mid=" + 
				angular.toStringIfIsUndefinedOrNull(moduleId) + "&maid=" + 
				angular.toStringIfIsUndefinedOrNull(macroId)  + "&vid=" + 
				angular.toStringIfIsUndefinedOrNull(versionId)  + "&fid=" + 
				angular.toStringIfIsUndefinedOrNull(functionId) + "&aid=" + 
				angular.toStringIfIsUndefinedOrNull(advertiserId) ;
			
		$http.post(url, userData)
		.success(function(data, status, headers, config)
		{
			console.log("Success in RuleService.put");
			q.resolve(data);
			
		})
		.error(function(data, status, headers, config)
		{
			
			console.log("Error in RuleService.put");
			
			q.reject(status);
		});
		
		return q.promise;

	}

});
