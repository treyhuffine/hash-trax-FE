(function() {
  'use strict';

  angular.module('hashtrax.config.routes', [])
    .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'templates/home.html',
        });

      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'templates/dashboard.html',
        });
      $stateProvider
        .state('support', {
          url: '/support',
          templateUrl: 'templates/support.html',
        });
      $stateProvider
        .state('register', {
          url: '/register',
          templateUrl: 'templates/registration.html',
        });

      $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
      });

      $locationProvider.hashPrefix('!');

    });
})();
