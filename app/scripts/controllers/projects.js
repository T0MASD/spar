'use strict';

angular.module('sparApp')
  // list projects
  .controller('ProjectsCtrl', function ($scope, Projectservice) {
    var projects = Projectservice.getProjects().$object;
    $scope.projects = projects;
  })
  // edit project
  .controller('ProjectEditCtrl', function ($scope, $location, Projectservice, project, Restangular) {
    $scope.project = Restangular.copy(project);

    $scope.save = function() {
      $scope.project.put().then(function() {
        $location.path('/projects');
      });
    };

    $scope.destroy = function() {
      $scope.project.remove().then(function() {
        $location.path('/projects');
      });
    };

  })
  // create project
  .controller('ProjectCreateCtrl', function ($scope, $location, Projectservice) {
    $scope.save = function() {
      Projectservice.createProject($scope.project).then(function(project) {
        $scope.createdProject = project;
        $location.path('/projects');
      });
    };
  })
  // show project
  .controller('ProjectShowCtrl', function ($scope, $location, Projectservice, project, Restangular) {
    $scope.project = Restangular.copy(project);
    var teamsPromise = Projectservice.listTeams($scope.project);
    var allMembers = Projectservice.listMembers(teamsPromise);
    
    $scope.teams = teamsPromise.$object;
    $scope.members = allMembers;
  });

