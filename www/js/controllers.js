angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope,$ionicPlatform) {
	
	ionic.Platform.ready(function() {
    	// hide the status bar using the StatusBar plugin

    	StatusBar.hide();
  	});

})

.controller('BoardCtrl', function($scope) {})

.controller('WaitingAdminCtrl', function($scope) {})


.controller('CreateCtrl', function($scope, $http, $state, Rest) {
	$scope.formData = {
		teams: '2',
		rounds: '2',
		time_match: '60',
		penalty: true
	};


	$scope.create = function() {
		var req = {
			method: 'POST',
			url: 'http://www.agustinherrera.es/prueba/create.json',
			data: $scope.formData
		};
		//$http({method: 'GET', url: 'http://www.agustinherrera.es/prueba/create.json'}).
		$http(req).
		success(function(data, status, headers, config) {
			$state.go('teams', {
				'code_match': data.code_match,
				'teams': data.teams
			});
		}).
		error(function(data, status, headers, config) {
			var alertPopup = $ionicPopup.alert({
				title: 'ERROR!',
				template: 'No hemos podido crear la partida. Prueba de nuevo'
			});
			alertPopup.then(function(res) {
				$state.go('home');
			});
		});
	};
})

.controller('MatchCtrl', function($scope, $stateParams, $state, Rest) {
	$scope.code_match = $stateParams.code_match;

	$scope.joinMatch = function() {
		var params = {};
		params.code_match = $scope.code_match;
		params.action = "created_match";
		$scope.data = Rest.join_match(params);
		$state.go('teams', {
			'code_match': $scope.data.code_match,
			'teams': $scope.data.teams,
			'player_code': $scope.data.player_code
		});
	}
})


.controller('WaitingCtrl', function($scope, $state, $stateParams, $interval, Rest, $ionicPopup) {
	console.log("state params:", $stateParams);

	var refreshData = function() {
		var ret = Rest.check_status_match($stateParams.code_match);

		if (ret.status !== 0) {
			//Comprobamos si es admin
			if (ret.is_admin) {
				$state.go('start_match');
			} else {
				$state.go('waiting_admin');
			}

		}

	};

	//Envia una solicitud al server cada segundo para comprobar que esten todos preparados
	var promise = $interval(refreshData, 1000);

	// Cancel interval on page changes
	$scope.$on('$destroy', function() {
		if (angular.isDefined(promise)) {
			$interval.cancel(promise);
			promise = undefined;
		}
	});


})

.controller('StartMatchCtrl', function($scope, $state) {
	$scope.start_match = function() {

		$state.go('board');
	}
})

.controller('BoardCtrl', function($scope, $state) {
	$scope.next = function() {

		$state.go('boardScore');
	}
});