'use strict';

describe('Controller: ProjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('sparApp'));

  var ProjectsCtrl, $httpBackend, scope, $controller, Restangular, projectsResponse;
  
  //Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    projectsResponse = [
      {name:'Project 1'},
      {name:'Project 2'}
    ];
    $httpBackend.when('GET', 'api/projects').respond(projectsResponse);
    scope = $injector.get('$rootScope');
    Restangular = $injector.get('Restangular');

    Restangular.setBaseUrl('api');
    Restangular.setDefaultRequestParams({});
    
    $controller = $injector.get('$controller');
    ProjectsCtrl = $controller('ProjectsCtrl', { $scope: scope });
  }));

  //call each test case
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it ('should expect get api/projects', function () {
    $httpBackend.expectGET('api/projects');
    $httpBackend.flush();
  });

  it('should expect response from scope.projectsObject to be same as projectsResponse', function () {
    var projects = scope.projects;
    $httpBackend.flush();
    expect(Restangular.stripRestangular(projects)).toEqual(projectsResponse);
  });

});


describe('Controller: ProjectEditCtrl', function () {

  // load the controller's module
  beforeEach(module('sparApp'));

  var ProjectEditCtrl, scope, $controller, Restangular, myProject;
  
  //Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    myProject = {id:'4', name:'Project 1'};
    scope = $injector.get('$rootScope');
    Restangular = $injector.get('Restangular');
    $controller = $injector.get('$controller');
    ProjectEditCtrl = $controller('ProjectEditCtrl', {
      $scope: scope,
      project: myProject
    });

  }));


  it ('should expect get api/projects', function () {
    expect(Restangular.stripRestangular(scope.project)).toEqual(myProject);
  });

});