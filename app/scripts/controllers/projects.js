'use strict';

angular.module('sparApp')
  // list projects
  .controller('ProjectsCtrl', function ($scope, Projectservice) {
    var projects = Projectservice.getProjects().$object;
    $scope.projects = projects;
  })
  // edit project
  .controller('ProjectEditCtrl', function ($scope, $location, Projectservice, project, Restangular) {
    var original = project;
    $scope.project = Restangular.copy(original);
    // var projects = Projectservice.getProjects().$object;
    // $scope.projects = projects;
  });

