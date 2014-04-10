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

    $scope.save = function() {
      $scope.project.put().then(function() {
        $location.path('/projects');
      });
    };

  })
  .controller('ProjectCreateCtrl', function () {
    // TDB

  });

