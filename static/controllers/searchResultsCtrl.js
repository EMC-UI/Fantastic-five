/**
 * Created by narrah on 8/30/16.
 */
emcPingApp.controller('searchResultsCtrl', function($scope, $location,$route, loginService,questionService,searchService, $rootScope, $http){
    $scope.saveQuestion = function(question){
        questionService.setQuestion(question);
        console.log(questionService.getQuestion());
        $location.path('/postAnswer/:question.id');
        $route.reload();
        
    }

    $scope.getSearchResults = function(){
        console.log("in search results init")
        $scope.searchResults= searchService.getsearchResults();
        console.log(searchService.getsearchResults());
    }

});