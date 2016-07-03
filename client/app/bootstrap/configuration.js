(function (app) {
    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
            return function (exception, cause) {
                $delegate(exception, cause);
                var notification = $injector.get("notificationService");
                notification.displayError(exception.message);
            };
        });
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push("addToken");
    });

    app.run(['Auth', 'localStorageService', '$location', '$http', '$rootScope', '$state', function (Auth, localStorageService, $location, $http, $rootScope, $state) {
        Auth.fillAuthData();
        var authData = localStorageService.get('isAuth');
        if (authData) {
            //  $http.defaults.headers.common['Authorization'] = 'Basic ' + authData.membershipData;
            $location.path("/videos");
        }

        $rootScope.$on("$stateChangeStart", function (event, nextRoute, currentRoute) {
            Auth.fillAuthData();
            if ((nextRoute.access && nextRoute.access.requiredLogin) && !Auth.isAuth) {
                window.currentRoute = $location.path();
                $location.path("/login");
            }
        });

    }]);


    app.constant('serviceBase', {
        apiBaseUri: "http://localhost:3004/"
    });

})(angular.module("videoportal"));