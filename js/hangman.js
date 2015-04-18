var app = angular.module('hangman', ['firebase']);

app.constant('FIREBASE_URI', 'http://blinding-heat-8369.firebaseio.com/');

app.controller('MasterWord', function($scope, GameService){
  $scope.word = "hello world";
  $scope.gameId = 0; //TODO: allow admin to select gameId
  $scope.setWord = function(){
    if ($scope.word){
      GameService.setWord($scope.word, $scope.gameId); //finds gameId and adds word to it
      $scope.word = '';
    }
  };
  $scope.game = GameService.getGame($scope.gameId);
});

app.service('GameService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var games = $firebaseArray(ref);

    service.getGame = function (gameId) {
        return games[gameId];
    };

    service.setWord = function (word, gameId) {
      ref.remove();
      var game = {};
      game.players = [];
      game.secretWord = word;
      games.$add(game);
    };
});
