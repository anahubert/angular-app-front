/*  /app
      /controllers
      /directives
      /services
      /partials
      /views

  #######################################################################*/

var app = angular.module('utmApp', ['ui.codemirror', 'ngRoute', 'ui.bootstrap', 'ng-context-menu', 'ng-breadcrumbs']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider,  $locationProvider) {
	$routeProvider
	.when('/angular-app-back',
	{
		templateUrl: '/angular-app-back/app/partials/container-new.html',
		controller: 'UtmMainController',
		label: 'Create New UTT'
	})
	.when('/angular-app-back/advertiser/container/:uAdvertiserId',
	{
		templateUrl: '/angular-app-back/app/partials/advertiser-container.html',
		controller: 'UtmMainController',
		label: 'Advertiser Containers'
	})
	.when('/angular-app-back/container/list',
	{
		templateUrl: '/angular-app-back/app/partials/container-list.html',
		controller: 'UtmMainController',
		label: 'Containers'
	})
	.when('/angular-app-back/container/create',
	{
		templateUrl: '/angular-app-back/app/partials/container-new.html',
		controller: 'UtmMainController',
		label: 'Create New UTTM'
	})
	.when('/angular-app-back/container/edit/:uContainerId',
	{
		templateUrl: '/angular-app-back/app/partials/container-edit.html',
		controller: 'UtmMainController',
		label: 'Container Edit'
	})
	.when('/angular-app-back/advertiser/list',
	{
		templateUrl: '/angular-app-back/app/partials/advertiser-list.html',
		controller: 'UtmMainController',
		label: 'Advertisers'
	})
	.when('/angular-app-back/macro/list',
	{
		templateUrl: '/angular-app-back/app/partials/macro-list.html',
		controller: 'UtmMainController',
		label: 'Macros'
	})
	.when('/angular-app-back/module/list',
	{
		templateUrl: '/angular-app-back/app/partials/module-list.html',
		controller: 'UtmMainController',
		label: 'Modules'
	})
	.when('/angular-app-back/function/list',
	{
		templateUrl: '/angular-app-back/app/partials/function-list.html',
		controller: 'UtmMainController',
		label: 'Functions'
	})
	.when('/angular-app-back/rule/new',
	{
		templateUrl: '/angular-app-back/app/partials/rule-new.html',
		controller: 'UtmMainController',
		label: 'Create New Rule'
	})
	.when('/angular-app-back/rule/list',
	{
		templateUrl: '/angular-app-back/app/partials/rule-list.html',
		controller: 'UtmMainController',
		label: 'Rules'
	})
	.otherwise({
		templateUrl: '/angular-app-back/app/partials/container-new.html',
		controller: 'UtmMainController',
		label: 'Create New UTT'
            })

	$locationProvider.html5Mode(true);


});
