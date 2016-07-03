(function(app){
app.directive('videoPlayList', ['localStorageService','$timeout', 'DataService', function (localStorageService,$timeout, DataService) {
    return {
        scope: {
            
        },
        restrict: 'EA',
        templateUrl: 'templates/videos.html',

        link: function (scope, ele) {
           
            $timeout(function () {
               
                $(".video-js").each(function (videoIndex) {
                    var videoId = $(this).attr("id");
                    videojs(videoId).ready(function () {
                        this.on("play", function (e) {
                            //pause other video
                            $(".video-js").each(function (index) {
                                if (videoIndex !== index) {
                                    this.player.pause();
                                }
                            });
                        });

                    });
                });
            },50);
           

        },
        controller: function ($scope, $element, $attrs) {
            var authData = localStorageService.get('authorizationData');
            $scope.skip = 0;
            $scope.limit = 5;
            $scope.videos = [];
            var model = {
                skip: $scope.skip,
                limit: $scope.limit
            }

            $scope.RegisterPlayPause = function () {
              


            }

            $scope.init = function (model) {
                DataService.GetAllVideos(model).then(function (data) {
                    console.log(data);
                    angular.forEach(data.data.data, function (item, index) {
                        var sum = 0;
                        for (var count = 0; count < item.ratings.length; count++) {
                            sum = sum + item.ratings[count];
                        }
                        item.rating = sum / item.ratings.length;
                        $scope.videos.push(item);
                    });
                    $scope.RegisterPlayPause();

                });
            }

            $scope.init(model);

            $scope.LoadMore = function () {
                $scope.skip += 5;
                $scope.limit = 5;
                var param = {
                    skip: $scope.skip,
                    limit: $scope.limit
                }
                $scope.init(param);
            }

        }
    };
}]);

})(angular.module("videoportal"));
