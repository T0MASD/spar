'use strict';

angular.module('sparApp')
  // list projects
  .controller('ProjectsCtrl', ['$scope', 'Projectservice', function ($scope, Projectservice) {
    var projects = Projectservice.getProjects().$object;
    $scope.projects = projects;
  }])
  // edit project
  .controller('ProjectEditCtrl', ['$scope', '$location', 'Projectservice', 'project', 'Restangular', '$http', 'limitToFilter', 'toaster', '_', function($scope, $location, Projectservice, project, Restangular, $http, limitToFilter, toaster, _) {
    $scope.project = Restangular.copy(project);
    var teamsPromise = Projectservice.listTeams($scope.project);
    var allMembers = Projectservice.listMembers(teamsPromise);
    $scope.teams = teamsPromise.$object;
    $scope.members = allMembers;

    // modify project
    $scope.save = function() {
      $scope.project.put().then(function() {
        $location.path('/projects');
      });
    };
    // delete project
    $scope.destroy = function() {
      $scope.project.remove().then(function() {
        $location.path('/projects');
      });
    };
    // add new team to a project
    $scope.createTeam = function(newTeam) {
      Projectservice.createTeam($scope.project, newTeam).then(function(response) {
        // push new team to teams
        $scope.teams.push(response);
        newTeam.name = '';
      });
    };
    // modify project team
    $scope.saveTeam = function(team) {
      Projectservice.saveTeam(team).then(function(response) {
        // assign team name from response
        team.name = response.name;
      });
    };
    // delete project team
    $scope.deleteTeam = function(team) {
      Projectservice.deleteTeam(team).then(function() {
        // remove deleted team from $scope.teams
        $scope.teams.splice($scope.teams.indexOf(team), 1);
      });
    };
    // add new member to a team
    $scope.addMember = function(team, newMember) {
      // check if member was selected from the typeahead
      if (newMember.person.personId === undefined){
        toaster.pop('warning', 'Warning', 'Please select person from the list');
      } else {
        Projectservice.addMember(team, newMember).then(function(response) {
          // push new member to members
          $scope.members.push(response);
          // clear newMember, .person is undefined in addMember service
          newMember.teamId = undefined;
          newMember.personId = undefined;
          newMember.role = undefined;
          newMember.name = undefined;
        });
      }
    };
    // modify team member
    $scope.saveMember = function(member) {
      Projectservice.saveMember(member).then(function(response) {
        // assign member from response
        member = response;
      });
    };
    // delete project team
    $scope.deleteMember = function(member) {
      Projectservice.deleteMember(member).then(function() {
        // remove deleted team from $scope.teams
        $scope.members.splice($scope.members.indexOf(member), 1);
      });
    };
    // roles typehead
    var searchMemberRoles = function(role) {
      return Projectservice.searchMemberRoles(role).then(function(response){
        return limitToFilter(response, 10);
      });
    };
    $scope.searchMemberRoles = _.throttle(searchMemberRoles, 100);
    // team member typehead    
    var searchPeople = function(query) {
      if (query.length > 2) {
        return Projectservice.searchPeople(query).then(function(response){
          return limitToFilter(response, 10);
        });
      } else {
        return [];
      }
    };
    $scope.searchPeople = _.throttle(searchPeople, 100);

    // end edit project
  }])
  // create project
  .controller('ProjectCreateCtrl', ['$scope', '$location', 'Projectservice', function ($scope, $location, Projectservice) {
    $scope.save = function() {
      Projectservice.createProject($scope.project).then(function(project) {
        $scope.createdProject = project;
        $location.path('/projects');
      });
    };
  }])
  // show project
  .controller('ProjectShowCtrl', ['$scope', '$location', 'Projectservice', 'project', 'Restangular', function ($scope, $location, Projectservice, project, Restangular) {
    $scope.project = Restangular.copy(project);
    var teamsPromise = Projectservice.listTeams($scope.project);
    var allMembers = Projectservice.listMembers(teamsPromise);
    $scope.teams = teamsPromise.$object;
    $scope.members = allMembers;
  }]);

