var app = angular.module('hangman', ['firebase']);

app.constant('FIREBASE_URI', 'http://blinding-heat-8369.firebaseio.com/');

app.controller('MasterWord', function($scope, WordService){
  $scope.word = "hello world";
  $scope.addWord = function(){
    if ($scope.word){
      WordService.addWord($scope.word);
      $scope.word = '';
    }
  };
});

app.service('WordService', function ($firebaseArray, FIREBASE_URI) {
    var service = this;
    var ref = new Firebase(FIREBASE_URI);
    var words = $firebaseArray(ref);

    service.getWords = function () {
        return words;
    };

    service.addWord = function (word) {
        words.$add(word);
    };

    service.updateWord = function (word) {
        words.$save(word);
    };

    service.removeWord = function (word) {
        words.$remove(word);
    };
});
