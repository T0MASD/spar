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
    RestangularProvider.setBaseUrl('http://0.0.0.0:6543');
    RestangularProvider.setRestangularFields({id: '_id.$oid'});
  }) // end config
  .run(function (Restangular, toaster) {
    // add request interceptor
    Restangular.addRequestInterceptor(function(elem, operation) {
      if (operation === 'put') {
        elem._id = undefined;
        return elem;
      }
      return elem;
    });
    // add response interceptor pending on https://github.com/mgonto/restangular/issues/716
    // Restangular.setFullResponse(true);
    // Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    //   var newResponse;
    //   newResponse = response.data;
    //   return newResponse;
    // });
  }); // end run
  

