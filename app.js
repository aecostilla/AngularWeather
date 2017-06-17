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
  
    .when('/forecast/:days', {
      templateUrl: 'pages/forecast.html',
      controller: 'forecastController'
  })
  
});

weatherApp.service('cityService', function(){
    this.city = "Laredo, TX";
});

weatherApp.controller('weatherController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{ callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $scope.days = $routeParams.days || '3';
    $scope.weatherResult =
        $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days,
        appid: "716198b9f309561d999bf34c36c09c14"
    });

    $scope.convertTempF = function(degK){
        return Math.round((1.8 * (degK - 273) + 32));
    };

    $scope.convertDate = function(date){
        return new Date(date * 1000);
    };
}]);

weatherApp.directive("weatherReport", function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: '=',
            convertToTemp: '&',
            convertToDate: '&',
            dateFormat: '@'
        }
    }
});