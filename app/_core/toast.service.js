(function(){
    "use strict";

    angular
        .module("app.config")
        .factory('ToastService', ToastService);

        function ToastService($mdToast)
        {
            var delay   = 6000,
            position    = 'top right',
            action      = 'OK';

            return {
                show: function(content) {
                    return $mdToast
                        .show(
                            $mdToast.simple()
                            .content(content)
                            .position(position)
                            .action(action)
                            .hideDelay(delay)
                        );
                }
            };
        };
})();