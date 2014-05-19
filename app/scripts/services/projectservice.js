'use strict';

angular.module('sparApp')
  .service('Projectservice', function Projectservice(Restangular) {

  return {
    getProjects: function() {
      return Restangular.all('projects').getList();

    },
    getProject: function(projectId) {
      return Restangular.one('projects', projectId).get();
    },
    createProject: function(project) {
      return Restangular.all('projects').post(project);
    },
    listTeams: function(project) {
      // get teams from /projects/536997c9f7890c40770656a6/teams
      return project.all('teams').getList();
    },
    listMembers: function(teamsPromise) {
      // get members from teams /projects/536997c9f7890c40770656a6/teams/ID's/members
      var allmembers = [];

      var appendMembers = function(members){
        allmembers.push.apply(allmembers, members);
      };

      teamsPromise.then(function(teams){
        for (var i = 0; i < teams.length; i++) {
          var team = teams[i];
          team.all('members').getList().then(appendMembers);
        }
      });
      return allmembers;
    },
  };
});
