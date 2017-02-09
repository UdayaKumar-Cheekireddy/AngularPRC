//module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ROUTES
weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
        .when('/', {
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
        })
    
        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        })
    
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController'
        });
});

//services
weatherApp.service('cityService', function () {
    this.city = "Bengaluru";
});

//controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;
    
    $scope.$watch('city', function () {
        cityService.city = $scope.city;   
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function ($scope, cityService, $resource,  $routeParams) {
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 1;
    
    $scope.weatherApi = $resource("http://api.apixu.com/v1/forecast.json");
    
    $scope.weatherResult = $scope.weatherApi.get({ q: $scope.city, key: '50c41859dee443ce959192030170902', days: $scope.days});
    
}]);