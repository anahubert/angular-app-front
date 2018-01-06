'use strict';

/* Filters */

app.filter('active', function () {

	console.log("Hello from utm filters");
	return function (input) {
		return input ? "active" : '';
	};
});

app.filter('searchContainer', function () {

	console.log("Hello from utm filters show");
	return function (input, scope) {
		$.each(input, function (k, v)
		{
			console.log(v.container_name);
			if (v.container_name == "")
				delete input[k];
		});
		return input;
	}
});

app.filter('orderObjectBy', function () {
	return function (items, field, reverse) {
		var filtered = [];
		angular.forEach(items, function (item) {
			filtered.push(item);
		});

		filtered.sort(function (a, b) {
			return (a[field] > b[field]);
		});

		if (reverse)
			filtered.reverse();
		return filtered;
	};
});

app.filter('capitalize', function () {
	return function (input, all) {
		return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}) : '';
	}
});

app.filter('groupBy', function (list, col) {

	var newList = [{}];

	angular.forEach(list, function (item, index) {

		newList[item[col]] = item;
		
	});

	return newList;

});
