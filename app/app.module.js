(function() {
	'use strict';

	angular
		.module('app', [
			// Angular Modules
			'ngRoute',
			'ngMaterial',

			// Third party modules.


			// Custom Modules
			'app.layout',
		])
		.config(configFunction);

		configFunction.$inject = ['$routeProvider', '$interpolateProvider', '$mdIconProvider'];

		function configFunction($routeProvider, $interpolateProvider, $mdIconProvider)
		{
			$routeProvider
				.otherwise({ redirectTo: '/' });

			$interpolateProvider
				.startSymbol('<%')
				.endSymbol('%>');

			$mdIconProvider
				.defaultIconSet('content/svg/mdi.svg')
		}
})();