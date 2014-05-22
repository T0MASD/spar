'use strict';

describe('Service: Authservice', function () {

  // load the service's module
  beforeEach(module('sparApp'));

  // instantiate service
  var Authservice;
  beforeEach(inject(function (_Authservice_) {
    Authservice = _Authservice_;
  }));


  it('Authservice is defined', function () {
    expect(!!Authservice).toBe(true);
  });

  it('Authservice.login() is defined', function () {
    expect(!!Authservice.login).toBe(true);
  });

});
