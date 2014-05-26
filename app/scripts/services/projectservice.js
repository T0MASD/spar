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
    // add new team to a project
    createTeam: function(project, newTeam) {
      newTeam.projectId = project._id.$oid;
      return project.all('teams').post(newTeam);
    },
    // modify project team
    saveTeam: function(team) {
      return team.put();
    },
    // delete project team
    deleteTeam: function(team) {
      return team.remove();
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
    // add new member to a team
    addMember: function(team, newMember) {
      newMember.teamId = team._id.$oid;
      return team.all('members').post(newMember);
    },
    // modify team member
    saveMember: function(member) {
      return member.put();
    },
    // delete team member
    deleteMember: function(member) {
      return member.remove();
    },
    // search member roles used in roles typehead
    searchMemberRoles: function(query){
      return Restangular.all('search').getList({'resource': 'memberRoles', 'query':query});
    },
    // search people used in name typehead
    searchPeople: function(query){
      return Restangular.all('search').getList({'resource': 'people', 'query':query});
    },
  };
});
