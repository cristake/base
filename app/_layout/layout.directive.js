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
			controller: SidebarController,
			controllerAs: 'vm',
			scope: {}
		};
	}

	SidebarController.$inject = ['layoutService'];

	function SidebarController(layoutService)
	{
		var vm = this;

		vm.menus = layoutService.getMenus();
	}

})();