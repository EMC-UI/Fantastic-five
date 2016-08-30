emcPingApp.controller("postAnswerCtrl", function($scope, $location, loginService, questionService, $rootScope, $window,
                                                 $http, $routeParams){


    $scope.status = "";
    $scope.ip = "128.222.159.134";
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
        $http.get('http://128.222.159.134:3000/api/questions/' + $routeParams.questionId)
            .then(function(response){
                    questionService.setQuestion(response.data);
                    console.log(questionService.getQuestion());

                    $scope.questionUser = questionService.getQuestion().username;
                    $scope.questionTitle = questionService.getQuestion().title;
                    $scope.questionContent = questionService.getQuestion().content;
                    $scope.answersList = questionService.getQuestion().answers;
                },
                function(response){
                    console.log("Question could not be searched");
                    $scope.message = response.data.error;
                });
    } else {
        $scope.questionUser = questionService.getQuestion().userId;
        $scope.questionTitle = questionService.getQuestion().title;
        $scope.questionContent = questionService.getQuestion().content;
        $scope.answersList = questionService.getQuestion().answers;
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
                $scope.result = "Failed to post the answer. Please check content.";
            });

    };

});
