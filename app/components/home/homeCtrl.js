var app = angular.module('healthyGulpAngularApp');

    app.controller('homeCtrl', function ($scope, homeSrv) {
        $scope.name = homeSrv.name;
        $scope.ancestry = homeSrv.ancestry;
        function filter(array, test) {
            var passed = [];
            for (var i = 0; i < array.length; i++) {
                if (test(array[i]))
                    passed.push(array[i]);
            }
            return passed;
        }

        function logData(array, data) {
            for (var i = 0; i < array.length; i++) {
                for (var key in array[i]) {
                    if (key == data) {
                        //console.log(array[i][key]);
                    }
                }
            }
        }

        $scope.ancestry.then(function(response){
            $scope.data = filter(response.data, function (person) {
                return person.born > 1900 && person.born < 1925;
            });
        });

        $scope.ancestry.then(function(response){
            logData(
                filter(response.data, function (person) {
                    return person.born > 1900 && person.born < 1925;
                }),
                'name');
        });
    });

