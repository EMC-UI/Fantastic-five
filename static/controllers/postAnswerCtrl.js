emcPingApp.controller("postAnswerCtrl", function($scope, $location, loginService, questionService, $rootScope, $window,
                                                 $http, $routeParams){


    $scope.status = "";
    $scope.ip = "localhost";
    $scope.port = 3000;

    $scope.generateRequest = function($method, $path, $header, $data) {
        return {
            method: $method,
            url: "http://"+$scope.ip+":"+$scope.port+"/api"+$path,
            headers: $header,
            data: $data
        };
    };

    // if we come here from a url directly and not by clicking a question
    if(!questionService.getQuestion()) {
        $http.get('http://localhost:3000/api/questions/' + $routeParams.questionId)
            .then(function(response){
                    questionService.setQuestion(response.data);
                    console.log(questionService.getQuestion());

                    $scope.questionUser = questionService.getQuestion().userId.username;
                    $scope.questionTitle = questionService.getQuestion().title;
                    $scope.questionContent = questionService.getQuestion().content;
                    $scope.answersList = questionService.getQuestion().answers;
                    $scope.tags = questionService.getQuestion().tags;
                },
                function(response){
                    console.log("Question could not be searched");
                    $scope.message = response.data.error;
                });
    } else {
        $scope.questionUser = questionService.getQuestion().userId.username;
        $scope.questionTitle = questionService.getQuestion().title;
        $scope.questionContent = questionService.getQuestion().content;
        $scope.answersList = questionService.getQuestion().answers;
        $scope.tags = questionService.getQuestion().tags;
    };


    $scope.postAnswer = function() {

        var $request = $scope.generateRequest(   "POST",
            "/questions/" + questionService.getQuestion()._id + "/answers",
            {'Content-Type': 'application/json', 'token': loginService.getToken()},
            $scope.answerFormData
        );

        console.log($scope.answerFormData);
        $http($request).then(
            //Success callback
            function(response){
                $scope.result = "Answer Posted Successfully!!!";
                //loginService.setToken(response.data.token);
            },
            // Error callback
            function(response){
                $scope.result = "Failed to post the answer. Please login and try again.";
            });

    };

});
