var app = angular.module('hangman', ['firebase']);

app.constant('FIREBASE_URI', 'http://blinding-heat-8369.firebaseio.com/');

app.controller('MasterWord', function($scope, WordService){
  $scope.word = "hello world";
  $scope.setWord = function(){
    if ($scope.word){
      WordService.setWord($scope.word);
      $scope.word = '';
    }
  };
  $scope.words = WordService.getWords();
  $scope.removeWord = function(){};
});

app.service('WordService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var words = $firebaseArray(ref);

    service.getWords = function () {
        return words;
    };

    service.setWord = function (word) {
      ref.remove();
      words.$add(word);
    };
});
