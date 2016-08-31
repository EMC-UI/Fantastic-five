/**
 * Created by narrah on 8/29/16.
 */
emcPingApp.controller('searchQuestionCtrl', function($scope, $location, $route,loginService,questionService,searchService, $rootScope, $http){
    $scope.submit = function(){
        console.log($scope.formData);
        $http.get('http://localhost:3000/api/questions',{params:{"title": $scope.formData.title}})
            .then(function(response){
                    console.log("Question Searched Successfully");
                    $scope.message = "Question Searched Successfully";
                    // $scope.searchResults=response.data;

                    searchService.setsearchResults(response.data);
                    $location.path('/searchQuestion');
                    $route.reload();
                },
                function(response){
                    console.log("Question could not be searched");
                    $scope.message = response.data.error;
                });
    };

    $scope.saveQuestion = function(question){
        questionService.setQuestion(question);
        console.log(questionService.getQuestion());
    }

    $scope.getSearchResults = function(){
        $scope.searchResults= searchService.getsearchResults();
        console.log(searchService.getsearchResults());
    }

    $scope.recentQuestions = function(){
        $http.get('http://localhost:3000/api/questions')
            .then(function(response){
                    console.log("Got recent questions");
                    searchService.setsearchResults(response.data);
                    $location.path('/searchQuestion');
                    $route.reload();
                },
                function(response){
                    console.log("Could not get recent questions");
                    $scope.message = response.data.error;
                });
    };



});