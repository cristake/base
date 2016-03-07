(function(){
	"use strict";

	angular
		.module('app.layout')
		.factory('layoutService', layoutService);

	layoutService.$inject = ['$resource'];

	function layoutService($resource)
	{
		var service = {
			getMenus: getMenus
		};

		var Menus = $resource('/data/menus.json');

		function getMenus() {
            return Menus.query().$promise.then(function(results) {
                return results;
            }, function(error) {
                console.log(error);
            });
        }

		return service;
	}

})();