/* global angular Firebase */
/* eslint-env browser */
/* eslint quotes: 0, strict: 0, no-unused-vars: 0, no-trailing-spaces: 0,
   no-console: 0 */


var app = angular.module('hangman');

//app.constant('FIREBASE_URI', 'http://blinding-heat-8369.firebaseio.com/');

app.controller('GuessWord', function($scope, $firebaseArray, GameService) {
  //var ref = new Firebase(FIREBASE_URI);
  //$scope.games = $firebaseArray(ref);
  $scope.game = GameService.getGame();
  $scope.playerName = GameService.getName();
  //$scope.secretWord = ['h', 'a', 'n', 'g', 'm', 'a', 'n' ];
  $scope.secretWord = $scope.game.secretWord.split('');
  // console.log($scope.games);
  // $scope.secretWord = $scope.games[0].secretWord.split('');
  // console.log($scope.games[0].secretWord);
  $scope.lettersGuessed = [];
  $scope.lettersGuessedCorrectly = [];
  $scope.currentGuess = '';
  
  $scope.guessNewLetter = function(letter){
    // console.dir(letter);
    
    $scope.lettersGuessed.push(letter);
    // console.log($scope.lettersGuessed);
    
    if ($scope.secretWord.indexOf(letter) !== -1) {
      if (letter !== '') { 
        $scope.lettersGuessedCorrectly.push(letter);
      }
    }
    
    $scope.currentGuess = '';
  };
});

/*
app.service('GameService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var games = $firebaseArray(ref);

    service.getGame = function () {
      return games;
    };

    service.setWord = function (word, gameId) {
      //ref.remove();
      var game = {};
      game.players = [];
      game.secretWord = word;
      games.$add(game);
    };
});
*/
