(function(app){
app.controller('VideoDetailController', ['$scope','DataService','localStorageService', '$state', function ($scope,DataService,localStorageService, $state) {
	
  
  var videoId=$state.params.videoId;
	var model={
		videoId:videoId
	}
	DataService.GetAVideo(model).then(function(data){
		console.log(data);
		$scope.video=data.data.data;
		
			var sum=0;
			for(var count=0;count<$scope.video.ratings.length;count++){
				sum=sum+$scope.video.ratings[count];
			}
			$scope.video.rating=sum/$scope.video.ratings.length;
		
		
	});
	
	
	$scope.UpdateRating=function(arg){
		
		var data={
			videoId:videoId,
			rating:arg
		}
		DataService.UpdateRating(data).then(function(result){
			console.log(result);
		});
	}
 
 
}]);
})(angular.module("videoportal"));
