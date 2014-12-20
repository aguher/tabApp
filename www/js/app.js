var app = angular.module('ionicApp', [
    'ionic',
    'ngCordova',
    'join',
    'players',
    'teams',
    'starter.controllers',
    'starter.services'
])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    });

    $stateProvider.state('create', {
        url: '/create',
        templateUrl: 'templates/create.html',
        controller: 'CreateCtrl'
    });

    $stateProvider.state('join', {
        url: '/join',
        templateUrl: 'templates/join.html',
        controller: 'JoinCtrl'
    });

    $stateProvider.state('players', {
        templateUrl: 'templates/players.html',
        controller: 'PlayersCtrl',
        params: ['code_match', 'teams']
    });

    $stateProvider.state('match', {        
        templateUrl: 'templates/match.html',
        controller: 'MatchCtrl',
        params: ['code_match', 'teams']
    });

    $stateProvider.state('teams', {
        templateUrl: 'templates/teams.html',
        controller: 'TeamsCtrl',
        params: ['code_match', 'player_code','teams','is_admin']
    });
    $stateProvider.state('start_match', {
        url: '/start_match',
        templateUrl: 'templates/start_match.html',
        controller: 'StartMatchCtrl'
    });
    $stateProvider.state('waiting', {
        templateUrl: 'templates/waiting.html',
        controller: 'WaitingCtrl',
        params: ['code_match', 'action'] 
    });
    $stateProvider.state('waiting_admin', {
        templateUrl: 'templates/waiting_admin.html',
        controller: 'WaitingAdminCtrl',
        params: ['code_match', 'action'] 
    });    
    $stateProvider.state('board', {
        templateUrl: 'templates/board.html',
        controller: 'BoardCtrl',
        params: ['code_match', 'action'] 
    });

})

.filter('translate', function() {
    return function(text) {
        if(text ==='red') {
            return 'Rojo';
        }
        else if(text ==='green') {
            return 'Verde';
        }
        else if(text ==='yellow') {
            return 'Amarillo';
        }
        else if(text ==='blue') {
            return 'Azul';
        }
    }
})
;
