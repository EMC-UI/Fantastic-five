/**
 * Created by narrah on 8/30/16.
 */
emcPingApp.controller('searchResultsCtrl', function($scope, $location, loginService,questionService,searchService, $rootScope, $http){
    $scope.saveQuestion = function(question){
        questionService.setQuestion(question);
        console.log(questionService.getQuestion());
    }

    $scope.getSearchResults = function(){
        console.log("in search results init")
        $scope.searchResults= searchService.getsearchResults();
        console.log(searchService.getsearchResults());
    }

});