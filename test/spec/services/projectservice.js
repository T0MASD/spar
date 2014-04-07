'use strict';

describe('Service: Projectservice', function () {

  // load the service's module
  beforeEach(module('sparApp'));

  // instantiate service
  var Projectservice;

  //Initialize the controller and a mock scope
  beforeEach(inject(function($injector) {
    Projectservice = $injector.get('Projectservice');
  }));

  
  it('Projectservice is defined', function () {
    expect(!!Projectservice).toBe(true);
  });

  it('Projectservice.getProjects() is defined', function () {
    expect(!!Projectservice.getProjects).toBe(true);
  });

  it('Projectservice.getProject() is defined', function () {
    expect(!!Projectservice.getProjects).toBe(true);
  });


});
