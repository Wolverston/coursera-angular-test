angular.module('healthyGulpAngularApp')

.directive('someComponent', [function() {
    return {
        restrict: 'A',
        templateUrl: 'components/auth/someComponent/someComponent.html'
    };
}]);