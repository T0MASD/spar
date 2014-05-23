'use strict';

angular.module('sparApp')
  .controller('LoginCtrl', function ($scope, $location, Authservice) {
    // login button
    $scope.login = function() {
      Authservice.login($scope.credentials.username, $scope.credentials.password).then(function(response) {
        $scope.result = response;
        $location.path('/projects');
      });
    };
    // logout button
    $scope.logout = function() {
      Authservice.logout().then(function(response) {
        $scope.result = response;
        $location.path('/home');
      });
    };
  });
