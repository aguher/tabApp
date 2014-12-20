angular.module( 'join', [])

/**
 * And of course we define a controller for our route.
 */
.controller( 'JoinCtrl',   function($scope, $stateParams, $state, $http, $timeout, $ionicLoading, Rest, $ionicPopup) {
		$scope.code_match = "";
		$scope.ocultar_texto = false;

		$scope.join = function() {
			if($scope.code_match == '') {
				var alertPopup = $ionicPopup.alert({
	                title: 'Hey! Un momento!',
	                template: 'Debes introducir un c&oacute;digo para empezar'
	            });
            
			}
			else {
				//Hacemos una llamada al servidor
				var params = {};
				params.code_match = $scope.code_match;
				params.action = "join_match";
				params.is_admin = false;
				$scope.data = Rest.join_match(params);				
				console.log("return:",$scope.data);
				$state.go('teams',{'code_match':$scope.data.code_match, 'teams':$scope.data.teams, 'player_code':$scope.data.player_code,'is_admin':'false'});

			}
		}
	}
);