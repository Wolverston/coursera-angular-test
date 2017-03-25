var app = angular.module('healthyGulpAngularApp')
    .service('homeSrv', function ($http) {
        this.name = "Kostya";
        this.ancestry = $http.get('ancestry.json');
    });