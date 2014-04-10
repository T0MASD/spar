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
  };
});
