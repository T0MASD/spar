'use strict';

angular.module('sparApp')
  .service('Authservice', function Authservice(Restangular, $base64) {
    return {
      login: function (username, password) {
        var enc = $base64.encode(username + ':' + password);
        Restangular.setDefaultHeaders({'Authorization': 'Basic ' + enc });
        Restangular.setDefaultHttpFields({'withCredentials':'true'});
        return  Restangular.one('login').get();
      },
      logout: function () {
        return  Restangular.one('logout').get();
      }
    };
  });
