'use strict';

angular.module('sparApp', [
  'ngRoute',
  'restangular',
  'ui.bootstrap'
])
  .config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .when('/projects/edit/:projectId', {
        templateUrl: 'views/projectedit.html',
        controller: 'ProjectEditCtrl',
        resolve: {
          project: function(Projectservice, $route){
            return Projectservice.getProject($route.current.params.projectId);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    // restangular config
    RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/spar/collections');
    RestangularProvider.setDefaultRequestParams({ apiKey: '1gBZiz7sjognilZY3t2MreqUHUCO4Qid' });

    RestangularProvider.setRestangularFields({
      id: '_id.$oid'
    });
    
    RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
      if (operation === 'put') {
        console.log('Running put on '+what);
        elem._id = undefined;
        return elem;
      }
      return elem;
    });

  });
