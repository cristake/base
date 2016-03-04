(function(){
	"use strict";

	angular
		.module('app.layout')
		.factory('layoutService', layoutService);

	// layoutService. = [''];

	function layoutService()
	{
		var service = {
			getMenus: getMenus
		};

		return service;

		function getMenus()
		{
			var menus = [
				{
					name: 'Dashboard',
					icon: 'view-dashboard'
				},
				{
					name: 'Settings',
					icon: 'settings'
				},
			];

			return menus;
		}
	}

})();