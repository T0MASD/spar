'use strict';

angular.module('sparApp')
  .service('Projectservice', function Projectservice(Restangular) {
    // AngularJS will instantiate a singleton by calling "new" on this function

  var restangularConfig = function(Configurer) {
    Configurer.setBaseUrl('api');
    Configurer.setRestangularFields( { id: '_id.$oid' } );
    Configurer.setRequestInterceptor(function(elem, operation, what) {
      if (operation === 'put') {
        console.log('Running put on '+what);
        elem._id = undefined;
        return elem;
      }
      return elem;
    });
  };

  var restAngular = Restangular.withConfig(restangularConfig);
  var _projectService = restAngular.all('projects');
  
  return {
    getProjects: function() {
      return _projectService.getList();
    }
  };
});
