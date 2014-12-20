angular.module('players', [])

/**
 * And of course we define a controller for our route.
 */


.controller('PlayersCtrl', function($scope, $stateParams, $state, $http, $timeout, $ionicLoading, Rest, $ionicPopup) {
    $scope.teams = $stateParams.teams.split(",");
    var array_teams = [];


    $stateParams.teams.split(",").map(function(item) {
        var every_team = {};
        var items = item.split(";");

        every_team.id = items[0];
        every_team.num_players = items[1];
        every_team.color = items[2];
        array_teams.push(every_team);
    });

    $scope.teams = array_teams;


    $scope.code_match = $stateParams.code_match;

    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        noBackdrop: false
    });
    $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function(result) {
        $ionicLoading.hide();
        $scope.breweries = result.data.breweries
    });

    $scope.remove = function(index) {
        if ($scope.teams[index].num_players >= 3) {
            $scope.teams[index].num_players = parseInt($scope.teams[index].num_players) - 1;
        }
    };

    $scope.add = function(index) {
        if ($scope.teams[index].num_players <= 3) {
            $scope.teams[index].num_players = parseInt($scope.teams[index].num_players) + 1;
        }
    };


    $scope.sendData = function() {
        var params = {};
        params.code_match = $scope.code_match;
        params.teams = $scope.teams;

        $scope.data = Rest.send_players(params);
        if ($scope.data.status === 0) {
          $state.go('match',{'code_match':$scope.data.code_match, 'teams':$scope.data.teams});
        } else {
            var alertPopup = $ionicPopup.alert({
                title: 'ERROR!',
                template: 'No hemos podido crear la partida. Prueba de nuevo'
            });
            alertPopup.then(function(res) {
                $state.go('home');
            });
        }
        
        
    };




});
