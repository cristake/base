(function() {
	'use strict';

	angular
		.module('app', [
			// Angular Modules.
			'ngRoute',
			'ngResource',
			'ngMaterial',
			'ngAnimate',

			// Third Party Modules.


			// Custom Modules.
			'app.config',
			'app.layout',
			'app.dashboard',
		]);
})();