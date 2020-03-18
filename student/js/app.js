'use strict';

var studentApp = angular.module("studentApp", ['ngRoute']);

studentApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'list.html',
            controller: `indexCtrl`
        })
        .when('/create', {
            templateUrl: 'create.html',
        })
        .when('/edit', {
            templateUrl: 'edit.html',
            controller: 'EditCtrl'
        })
});

studentApp.controller('indexCtrl', ['$scope', '$http', function($scope, $http){
    $http({
        method: 'GET',
        url: 'http://yii.student/students'
    }).then(function (response){
        $scope.students = response.data;
    },function (error){
        console.log(error);
    });
}]);

studentApp.controller('createCtrl', ['$scope', '$http', function($scope, $http){
    $scope.create = function(user) {
        let data = JSON.stringify(user)
        let message = ''
        $http({
            method: 'POST',
            data: data,
            url: 'http://yii.student/students',
        }).then(function (response) {
            message = "Created successfully"
            $scope.response = response
            $scope.message = message
        }, function (error) {
            $scope.response = error
            $scope.message = error.data[0].message
        });
    }
}]);

studentApp.controller('editCtrl', function ($scope, $http){
    $scope.update = function(user) {
        let data = JSON.stringify(user)
        let message = ''
        $http({
            method: 'POST',
            data: data,
            url: 'http://yii.student/students',
        }).then(function (response) {
            message = "Updated successfully"
            $scope.response = response
            $scope.message = message
        }, function (error) {
            $scope.response = error
            $scope.message = error.data[0].message
        });
    }
});