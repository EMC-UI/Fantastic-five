emcPingApp.controller("loginCtrl", function($scope, $location,$route, searchService,loginService, $rootScope, $window, $http){


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


    $scope.login = function() {
        var $request = $scope.generateRequest(   "POST",
                                                "/users/login",
                                                {'Content-Type': 'application/json'},
                                                $scope.loginFormData
                                            );
        $http($request).then(
            //Success callback
            function(response){
                $scope.result = "Login Successful!!!";
                loginService.setToken(response.data.token);

                $scope.recentQuest();
            },
            // Error callback
            function(response){
                $scope.result = "Login Failed!!! Invalid username or the password";
            });
        //loginService.setToken("testing token");
        //$location.url("/signup");
    };

    $scope.logout = function() {
        loginService.setToken("");
    };

    $scope.recentQuest = function(){
        $http.get('http://128.222.159.134:3000/api/questions')
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
