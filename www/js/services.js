angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Rest', function($http) {

var return_create = {
    "code_match": "301a",
    "teams": ["1;2;red","2;2;green"]
};
var return_send_players = {
  "status": 0,
  "code_match":"301A"
};

var return_join_match = {
  "player_code": "301a",
  "code_match":"301a",
  "teams": ["1;2;red","2;2;green"],
  "is_admin":false
};

var return_selected_team = {
  "status": 0,
  "is_admin":false
};

var return_check_status_match = {
  "status": 1,
  "is_admin": true
};
    return {
        

        create_match: function(params) {
            console.log("params:",params);
            var req = {
                method: 'POST',
                url: 'http://www.agustinherrera.es/prueba/create.json',
                data: params
            };
            //$http({method: 'GET', url: 'http://www.agustinherrera.es/prueba/create.json'}).
            $http(req).            
            success(function(data, status, headers, config) {
                return data;
            }).
            error(function(data, status, headers, config) {
                alert("error");
            });
            
        },
        send_players: function(params) {
            console.log("params:",params);
            
            return return_send_players;
        },
        join_match: function(params) {
            console.log("params:",params);
            
            return return_join_match;
        },
        selected_team: function(params) {
            console.log("params:",params);
            
            return return_selected_team;
        }, 
        check_status_match: function(code_match) {
            console.log("consultamos estado de partida:",code_match);

            return return_check_status_match;
        }


    }
});
