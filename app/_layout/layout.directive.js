(function() {
	'use strict';

	angular
		.module('app.layout')
		.directive('navBar', navBar)
		.directive('sideBar', sideBar);

	function navBar() {
		return {
			templateUrl: 'app/_layout/navbar.html',
			restrict: 'E',
			scope: {},
			controller: NavbarController,
			controllerAs: 'vm'
		};
	}

	function NavbarController()
	{
		var vm = this;
	}

	function sideBar() {
		return {
			templateUrl: 'app/_layout/sidebar.html',
			restrict: 'E',
			scope: {},
			controller: SidebarController,
			controllerAs: 'vm'
		};
	}

	function SidebarController()
	{
		var vm = this;
	}

})();