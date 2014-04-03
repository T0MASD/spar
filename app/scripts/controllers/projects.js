'use strict';

angular.module('sparApp')
  .controller('ProjectsCtrl', function ($scope, Projectservice) {
    var projects = Projectservice.getProjects().$object;
    $scope.projects = projects;
  });
