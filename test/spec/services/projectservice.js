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
    expect(!!Projectservice.getProject).toBe(true);
  });

  it('Projectservice.createProject() is defined', function () {
    expect(!!Projectservice.createProject).toBe(true);
  });

  it('Projectservice.createTeam() is defined', function () {
    expect(!!Projectservice.createTeam).toBe(true);
  });

  it('Projectservice.saveTeam() is defined', function () {
    expect(!!Projectservice.saveTeam).toBe(true);
  });

  it('Projectservice.deleteTeam() is defined', function () {
    expect(!!Projectservice.createTeam).toBe(true);
  });

  it('Projectservice.addMember() is defined', function () {
    expect(!!Projectservice.addMember).toBe(true);
  });

  it('Projectservice.saveMember() is defined', function () {
    expect(!!Projectservice.saveMember).toBe(true);
  });

  it('Projectservice.deleteMember() is defined', function () {
    expect(!!Projectservice.deleteMember).toBe(true);
  });


});
