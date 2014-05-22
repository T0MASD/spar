'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('sparApp'));

  var LoginCtrl, scope, $controller, Restangular, $httpBackend;
  
  //Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    scope = $injector.get('$rootScope');
    Restangular = $injector.get('Restangular');
    Restangular.setBaseUrl('api');
    Restangular.setDefaultRequestParams({});
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'api/login').respond({result:'ok'});
    $controller = $injector.get('$controller');
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
    });

  }));

  //call each test case
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // tests

  it ('should expect project to do login', function () {
    scope.credentials = {username:'dude', password:'duderino'};
    scope.login();
    $httpBackend.expectGET('api/login');
    $httpBackend.flush();
    expect(Restangular.stripRestangular(scope.result)).toEqual({result:'ok'});
  });

});
