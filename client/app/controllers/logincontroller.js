(function (app) {
app.controller('LoginController', ['DataService','notificationService', '$http', '$scope', 'Auth', '$location', 'localStorageService', 'md5', function (DataService,notificationService, $http, $scope, Auth, $location, localStorageService, md5) {  // here $scope is used for share data between view and controller
       
        if (Auth.isAuth)
        {
            $location.path("/videos");
        }
        $scope.user = {};
        $scope.errorMessage = '';
        $scope.validateUser = function () {
			$scope.user.password=md5.createHash($scope.user.password || '');
            DataService.Login($scope.user).then(function (data) {
                if (data.data.status==="success") {
                      
                    localStorageService.set('authorizationData', { "isAuth": true, "username": data.data.username, "sessionId": data.data.sessionId});
                   
                  //  $http.defaults.headers.common['Authorization'] = 'Basic ' + membershipData;
                    $location.path("/videos");
                }
                else {
                    Auth.isAuth = false;
                    notificationService.displayError("Invalid UserName/Password")
                    
                }
            }, function (error)
            {
                console.log("error" + error);
            });
        };
    }]);
})(angular.module("videoportal"));
