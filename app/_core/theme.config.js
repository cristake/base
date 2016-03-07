(function() {
	'use strict';

	angular
		.module('app.config')
		.config(configFunction);

		configFunction.$inject = ['$mdIconProvider', '$mdThemingProvider'];

		function configFunction($mdIconProvider, $mdThemingProvider)
		{
			$mdIconProvider
				.defaultIconSet('content/svg/mdi.svg');

			/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
			$mdThemingProvider
				.theme('default')
				.primaryPalette('teal')
				.accentPalette('orange')
				.warnPalette('red');
		}
})();