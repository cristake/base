(function() {
	'use strict';

	angular
		.module('app.config')
		.config(configFunction);

		configFunction.$inject = ['$interpolateProvider'];

		function configFunction($interpolateProvider)
		{
			$interpolateProvider
				.startSymbol('<%')
				.endSymbol('%>');
		}
})();