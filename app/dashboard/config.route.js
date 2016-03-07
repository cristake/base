(function() {
	'use strict';

	angular
		.module('app.dashboard')
		.config(configFunction);

	configFunction.$inject = ['$routeProvider'];

	function configFunction($routeProvider)
	{
		$routeProvider
			.when('/', { redirectTo: '/dashboard' })
			.when('/dashboard', {
				templateUrl: 'app/dashboard/dashboard.html',
				controller: 'dashboardController',
				controllerAs: 'vm'
			});
	}
})();