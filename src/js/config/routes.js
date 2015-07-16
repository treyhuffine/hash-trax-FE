(function() {
  'use strict';

  angular.module('hashtrax.config.routes', [])
    .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'templates/home.html',
        })
        .state('dashboard', {
          url: '/dashboard/:hash',
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .state('support', {
          url: '/support',
          templateUrl: 'templates/support.html',
        })
        .state('buy', {
          url: '/buy',
          templateUrl: 'templates/buy.html',
          controller: 'BuyCtrl'
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
