
(function(app){
app.factory('Auth',['localStorageService', function (localStorageService) {
        var _authentication = {
            isAuth: false,
            username: "",
            sessionId:''
        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.username = authData.username;
                _authentication.sessionId = authData.sessionId;
                
            }
        };
        _authentication.fillAuthData = _fillAuthData;

        return _authentication;
}]);

})(angular.module("videoportal"));