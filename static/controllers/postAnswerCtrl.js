emcPingApp.controller("postAnswerCtrl", function($scope, $location, loginService, $rootScope, $window, $http){


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

    $scope.questionTitle = "Hello Neha";
    $scope.questionContent = "I dont know";
    $scope.answersList = "{blah, blah, blah}";

    $scope.postAnswer = function() {
        var $request = $scope.generateRequest(   "POST",
            "/questions/" + 138712871 + " /answers", <!-- $rootScope.id -->
            {'Content-Type': 'application/json'},
            $scope.answerFormData
        );
        $http($request).then(
            //Success callback
            function(response){
                $scope.result = "Answer Posted Successfully!!!";
                loginService.setToken(response.data.token);
            },
            // Error callback
            function(response){
                $scope.result = "Failed to post the answer. Please check content.";
            });

    };

});
