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

  var ProjectEditCtrl, scope, $controller, Restangular, myProject, $httpBackend;
  
  //Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    myProject = {_id:{$oid:'123'}, name:'Project 1'};
    // set restangular route for the project
    myProject.route = 'projects';
    scope = $injector.get('$rootScope');
    Restangular = $injector.get('Restangular');
    Restangular.setBaseUrl('api');
    Restangular.setDefaultRequestParams({});
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('PUT', 'api/projects/123').respond(scope.project);
    $httpBackend.when('DELETE', 'api/projects/123').respond(scope.project);
    $controller = $injector.get('$controller');
    ProjectEditCtrl = $controller('ProjectEditCtrl', {
      $scope: scope,
      project: myProject
    });

  }));

  //call each test case
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // tests
  it ('should expect project object to be passed in and be restangular', function () {
    expect(Restangular.stripRestangular(scope.project)).toEqual(Restangular.stripRestangular(myProject));
  });

  it ('should expect project to do PUT on save', function () {
    scope.project.name = 'Updated Project 1';
    scope.save();
    $httpBackend.expectPUT('api/projects/123');
    $httpBackend.flush();
    expect(Restangular.stripRestangular(scope.project)).toEqual({ _id : { $oid : '123' }, name : 'Updated Project 1' });
  });

  it ('should expect project to do DELETE on destroy', function () {
    scope.destroy();
    $httpBackend.expectDELETE('api/projects/123');
    $httpBackend.flush();
  });

});


describe('Controller: ProjectCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('sparApp'));

  var ProjectCreateCtrl, scope, $controller, Restangular, $httpBackend;
  
  //Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    scope = $injector.get('$rootScope');
    Restangular = $injector.get('Restangular');
    Restangular.setBaseUrl('api');
    Restangular.setDefaultRequestParams({});
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('POST', 'api/projects').respond({_id:{$oid:'123'}, name:'Project 1'});
    $controller = $injector.get('$controller');
    ProjectCreateCtrl = $controller('ProjectCreateCtrl', {
      $scope: scope,
    });

  }));

  //call each test case
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // tests

  it ('should expect project to do POST on save', function () {
    scope.project = {_id:{$oid:'123'}, name:'Project 1'};
    scope.save();
    $httpBackend.expectPOST('api/projects');
    $httpBackend.flush();
    expect(Restangular.stripRestangular(scope.createdProject)).toEqual(scope.project);
  });

});

describe('Controller: ProjectShowCtrl', function () {

  // load the controller's module
  beforeEach(module('sparApp'));

  var ProjectShowCtrl, scope, $controller, $httpBackend, Restangular, myProject, myTeams, myTeamMembers;
  
  //Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    myProject = {_id:{$oid:'123'}, name:'Project 1'};
    // set restangular route for the project
    myProject.route = 'projects';
    myTeams = [{'_id': {'$oid': '536c5e7063b9bd7b726e580a'}, 'name': 'Core'}];
    myTeamMembers = [{'team_id': '536c5e7063b9bd7b726e580a', '_id': {'$oid': '536c618e63b9bd7b726e5815'}, 'name': 'Tomas'}];
    myTeams[0].members = myTeamMembers;
    scope = $injector.get('$rootScope');
    Restangular = $injector.get('Restangular');
    Restangular.setBaseUrl('api');
    Restangular.setDefaultRequestParams({});
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'api/projects/123/teams').respond(myTeams);
    $controller = $injector.get('$controller');
    ProjectShowCtrl = $controller('ProjectShowCtrl', {
      $scope: scope,
      project: myProject
    });

  }));

  //call each test case
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // tests
  it ('on load should expect get api/projects/123/teams', function () {
    $httpBackend.expectGET('api/projects/123/teams');
    var teams = scope.teams;
    var project = scope.project;
    $httpBackend.flush();
    expect(Restangular.stripRestangular(project)).toEqual(Restangular.stripRestangular(myProject));
    expect(Restangular.stripRestangular(teams)).toEqual(myTeams);
  });

});