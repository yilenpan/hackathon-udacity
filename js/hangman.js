var app = angular.module('hangman', ['firebase']);

app.controller('MasterWord', function($scope){
  $scope.word = "hello world";
});