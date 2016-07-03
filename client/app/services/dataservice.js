(function (app) {

    app.factory("DataService", ['$http', 'serviceBase', function ($http, serviceBase) {
        return {
            Login: function (data) {
                return $http({
                    url: serviceBase.apiBaseUri + 'user/auth',
                    method: 'POST',
                    data: data
                });
            },
            GetAllVideos: function () {
                return $http({
                    url: serviceBase.apiBaseUri + 'videos',
                    method: 'GET',

                });

            },
            GetAVideo: function (data) {
                return $http({
                    url: serviceBase.apiBaseUri + 'video',
                    method: 'GET',
                    params: data
                });

            },
            UpdateRating: function (data) {
                return $http({
                    url: serviceBase.apiBaseUri + 'video/ratings',
                    method: 'POST',
                    data: data
                });

            },
            LogOut: function () {
                return $http({
                    url: serviceBase.apiBaseUri + 'user/logout',
                    method: 'GET'
                });

            }
        }

    }]);

})(angular.module("videoportal"));