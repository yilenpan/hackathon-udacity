/* global angular Firebase */
/* eslint-env browser */
/* eslint quotes: 0, strict: 0, no-unused-vars: 0, no-trailing-spaces: 0,
   no-console: 0 */


var app = angular.module('hangman');

//app.constant('FIREBASE_URI', 'http://blinding-heat-8369.firebaseio.com/');

app.controller('GuessWord', function($scope, $firebaseArray, GameService) {
  $scope.game = GameService.getGame();
  $scope.playerName = GameService.getName();
  $scope.secretWord = $scope.game.secretWord.split('');
  $scope.lettersGuessed = [];
  $scope.lettersGuessedCorrectly = [];
  $scope.currentGuess = '';

  $scope.guessNewLetter = function(letter){
    // function(letter)

    $scope.lettersGuessed.push(letter);
    GameService.addGuessedLetter(letter, $scope.game)

    if ($scope.secretWord.indexOf(letter) !== -1) {
      if (letter !== '') {
        $scope.lettersGuessedCorrectly.push(letter);
      }
    }

    $scope.currentGuess = '';
  };
});


