(function (app) {
    app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('videos', {
                url: '/videos',
                template: '<video-play-list></video-play-list>',
                access: {
                    requiredLogin: true
                }

            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
         .state('logout', {
             url: '/logout',

             controller: 'LogOutController'
         })

        .state('videodetail', {
            url: '/video/:videoId',
            templateUrl: 'templates/videodetail.html',
            controller: 'VideoDetailController',
            access: {
                requiredLogin: true
            }
        });


    }]);

})(angular.module("videoportal"));