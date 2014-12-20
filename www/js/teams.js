angular.module('teams', [])

/**
 * And of course we define a controller for our route.
 */


.controller('TeamsCtrl', function($scope, $stateParams, $state, $http, $timeout, $ionicLoading, Rest, $ionicPopup) {
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
    $scope.player_code = $stateParams.player_code;
    $scope.is_admin = $stateParams.is_admin;

    $ionicLoading.show({
        templateUrl: 'templates/loading.html',
        noBackdrop: false
    });
    $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function(result) {
        $ionicLoading.hide();
        $scope.breweries = result.data.breweries
    });


    $scope.selectedTeam = function(index) {
        var params = {};
        params.code_match = $scope.code_match;
        params.player_code = $scope.player_code;
        params.id_selected_team = $scope.teams[index].id;
        params.is_admin = $scope.is_admin;

        $scope.data = Rest.selected_team(params);

        if ($scope.data.status === 0) {
          $state.go('waiting',{'code_match':$scope.code_match, 'action':'check_status_match'});
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
