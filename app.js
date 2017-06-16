var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);
//api key 716198b9f309561d999bf34c36c09c14

weatherApp.config(function($routeProvider){
  $routeProvider
  
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'weatherController'
    })
    
    .when('/forecast', {
      templateUrl: 'pages/forecast.html',
      controller: 'forecastController'
    })
  
});

weatherApp.service('cityService', function(){
    this.city = "New York, NY";
});

weatherApp.controller('weatherController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
    $scope.city = cityService.city;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{ callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = 
        $scope.weatherAPI.get({
        q: $scope.city,
        cnt: 2,
        appid: "716198b9f309561d999bf34c36c09c14"
    });
    
    console.log($scope.weatherResult);
}]);