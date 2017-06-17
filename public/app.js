var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

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

weatherApp.controller('weatherController', ['$scope', '$location', 'cityService', function($scope, $location, cityService){
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
    
    $scope.submit = function(){
        $location.path('/forecast');
    };
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams','cityService', function($scope, $resource, $routeParams, cityService){
    $scope.city = cityService.city;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{ callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    $scope.days = $routeParams.days || '3';
    $resource("key", {get: { method: "JSON" }}).get(function(data){
        var newData = "";
        for(var num in data){
            console.log()
            if(typeof data[num] === "string"){
                newData += data[num];
            }
        }
        
        $scope.weatherResult =
        $scope.weatherAPI.get({
            q: $scope.city,
            cnt: $scope.days,
            appid: newData
        });
        
        return newData;
    
    });
    
    $scope.convertTempF = function(degK){
        return Math.round((1.8 * (degK - 273) + 32));
    };

    $scope.convertDate = function(date){
        return new Date(date * 1000);
    };
    $scope.isHidden = true;
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