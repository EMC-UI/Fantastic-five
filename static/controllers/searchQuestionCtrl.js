/**
 * Created by narrah on 8/29/16.
 */
emcPingApp.controller('searchQuestionCtrl', function($scope, loginService,questionService, $rootScope, $http){
    $scope.submit = function(){
        console.log($scope.formData);
        $http.get('http://128.222.159.134:3000/api/questions',{params:{"title": $scope.formData.title}})
            .then(function(response){
                    console.log("Question Searched Successfully");
                    $scope.message = "Question Searched Successfully";

                    $scope.searchResults=response.data;
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

});