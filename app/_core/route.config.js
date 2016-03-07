(function() {
	'use strict';

	angular
		.module('app.config')
		.config(configFunction);

		configFunction.$inject = ['$routeProvider'];

		function configFunction($routeProvider)
		{
			$routeProvider
				.otherwise({ redirectTo: '/' });
		}
})();