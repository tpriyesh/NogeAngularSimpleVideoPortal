
(function(app){
app.controller('NavController', ['$scope', '$location', 'Auth', 'localStorageService', 'DataService','$state', function ($scope, $location, Auth, localStorageService, DataService,$state) {


    $scope.authentication = Auth;
   
    $scope.LogOff = function () {
       
        DataService.LogOut().then(function (data) {
           
            localStorageService.remove('authorizationData');
            Auth.isAuth = false;
            Auth.username = "";
            Auth.sessionId = "";

            Auth.fillAuthData();

            $state.go("login");

        });
       
    }

}]);
})(angular.module("videoportal"));