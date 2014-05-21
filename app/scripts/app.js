'use strict';

angular.module('sparApp', [
  'ngRoute',
  'restangular',
  'ui.bootstrap',
  'toaster'
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
          project: ['Projectservice', '$route', function(Projectservice, $route){
            return Projectservice.getProject($route.current.params.projectId);
          }]
        }
      })
      .when('/projects/show/:projectId', {
        templateUrl: 'views/projectshow.html',
        controller: 'ProjectShowCtrl',
        resolve: {
          project: ['Projectservice', '$route', function(Projectservice, $route){
            return Projectservice.getProject($route.current.params.projectId);
          }]
        }
      })
      .when('/projects/new', {
        templateUrl: 'views/projectnew.html',
        controller: 'ProjectCreateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // restangular config
    //var baseUrl = 'https://api.mongolab.com/api/1/databases/spar/collections';
    var baseUrl = 'http://0.0.0.0:6543';
    RestangularProvider.setBaseUrl(baseUrl);
    // var key = '1gBZiz7sjognilZY3t2MreqUHUCO4Qid';
    // RestangularProvider.setDefaultRequestParams({ apiKey: key });

    RestangularProvider.setRestangularFields({
      id: '_id.$oid'
    });
    
    RestangularProvider.setRequestInterceptor(function(elem, operation) {
      if (operation === 'put') {
        elem._id = undefined;
        return elem;
      }
      return elem;
    });

  });
