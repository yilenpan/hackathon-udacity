var app = angular.module('hangman', ['firebase']);

app.constant('FIREBASE_URI', 'http://blinding-heat-8369.firebaseio.com/');

app.controller('MasterWord', function($scope, GameService){
  $scope.gameId = 0; //TODO: allow admin to select gameId
  $scope.addGame = function(){
      GameService.addGame();
    };

  $scope.setWord = function(word, game){
    GameService.setWord(word, game); //finds gameId and adds word to it
    $scope.word = '';
  };
  $scope.games = GameService.getGames();
  $scope.currentGame = {};
  $scope.seeGame = false;
  $scope.hideGame = function(){
    $scope.seeGame = false;
  };
  $scope.joinGame = function(game){
    $scope.currentGame = game;
    console.log('join game');
    console.log(game);
    $scope.seeGame = true;
  };
});

app.service('GameService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var games = $firebaseArray(ref);

    service.getGames = function () {
        return games;
    };

    service.addGame = function() {
      var game = {};
      game.secretWord = 'Secret Word';
      game.players = [];
      games.$add(game);
    };

    service.setWord = function (word, game) {
      game.secretWord = word;
      games.$save(game);
    };

    service.addPlayer = function(name,gameId){
      var thisGame = games[parseInt(gameId)];
      console.log(thisGame);
      if(!thisGame.players){
        thisGame.players=[];
      }
      var playerProfile = {
          "name":name,
          "corr" :[],
          "inc" :[],
          "AoD" : false
      };
      thisGame.players.push(playerProfile);

      games.$save(thisGame);
}
});
