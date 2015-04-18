var app = angular.module('hangman', ['ngRoute', 'firebase']);

app.constant('FIREBASE_URI', 'http://blinding-heat-8369.firebaseio.com/');

app.config(function($routeProvider) {
 	$routeProvider
 		.when('/playerview', {
 	  		templateUrl: 'playerview.html',
 	  		controller: 'PlayerCtrl'
 	  	})
 	  	.when('/playergame', {
 	  		templateUrl: 'playergame.html',
 	  		controller: 'GuessWord'
 	  	})
 	  	.otherwise({
 	  		redirectTo: '/playerview'
 	  	});
 });

app.controller('PlayerCtrl', function($scope, $firebaseArray, FIREBASE_URI, GameService, $location){
    var ref = new Firebase(FIREBASE_URI);
    $scope.games = $firebaseArray(ref);
    $scope.startGame = function(game) {
    	GameService.setGame(game);
    	GameService.setName($scope.playerName);
    	$location.path('playergame');
    };

    $scope.joinGame = function(game) {
    	if (game.hasOwnProperty("secretWord")) {
    		$scope.startGame(game);
    	} else {
    		console.log("Game has not started!");
    	}
    };
});

app.service('GameService', function () {
	var service = this;
    var game = {};
    var name = "Default Player";

    service.getGame = function () {
        return game;
    };

    service.setGame = function (g) {
    	game = g;
    };

    service.getName = function() {
    	return name;
    };
    service.setName = function(n) {
    	name = n;
    };
});

