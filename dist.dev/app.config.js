var app = angular.module('healthyGulpAngularApp')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'components/home/home.html',
                    controller: 'homeCtrl',
                    controllerAs: 'home'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'components/auth/auth.html'
                });

        }]);