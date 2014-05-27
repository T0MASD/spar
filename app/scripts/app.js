'use strict';

angular.module('sparApp', [
  'ngRoute',
  'restangular',
  'ui.bootstrap',
  'toaster',
  'base64'
])
  // add lodash
  .constant('_', window._)
  // start config
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
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
    // add error interceptor
    Restangular.setErrorInterceptor(function(resp) {
      var status, title, message;
      if (resp.status === 0){
        status = 'error';
        title = 'Server Error';
        message = 'Unable to reach the server';
      }
      else{
        status = resp.data.toasterStatus || 'error';
        title = resp.data.toasterTitle || 'Unknown Error';
        message = resp.data.toasterMessage || 'Server did not respond with an error message';
      }
      toaster.pop(status, title, message);
      return false; // stop the promise chain
    });

    // add response interceptor pending on https://github.com/mgonto/restangular/issues/716
    // Restangular.setFullResponse(true);
    // Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    //   var newResponse;
    //   newResponse = response.data;
    //   return newResponse;
    // });
  }); // end run
  

