emcPingApp.controller("loginCtrl", function($scope, $location, loginService, $rootScope, $window, $http){


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
            },
            // Error callback
            function(response){
                $scope.result = "Login Failed!!! Invalid username or the password";
            });
        //loginService.setToken("testing token");
        //$location.url("/signup");
    };

});
