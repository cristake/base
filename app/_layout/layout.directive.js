(function() {
	'use strict';

	angular
		.module('app.layout')
		.directive('navBar', navBar)
		.directive('sideBar', sideBar);

	function navBar() {
		return {
			replace: true,
			templateUrl: 'app/_layout/navbar.html',
			restrict: 'E',
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
			replace: true,
			templateUrl: 'app/_layout/sidebar.html',
			restrict: 'E',
			controller: SidebarController,
			controllerAs: 'vm'
		};
	}

	SidebarController.$inject = ['layoutService', '$timeout','ToastService'];

	function SidebarController(layoutService, $timeout, ToastService)
	{
		var vm = this;

		vm.menus 		= [];
		vm.dataLoaded 	= false;
		vm.selected 	= null;
		vm.selectMenu 	= selectMenu;

		function selectMenu(menu) {
			vm.selected = angular.isNumber(menu) ? vm.menus[menu] : menu;
			ToastService.show('Clicked ' + vm.selected.name);
			console.log(vm.selected);
		}

		$timeout(function() {
			layoutService.getMenus().then(function(results) {
				vm.menus = results;
				vm.dataLoaded = true;
			}, function(error) {
				console.log(error);
			});
		}, 1000);

	}

})();