emcPingApp.controller("loginCtrl", function($scope, $http){


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
                $scope.result = angular.toJson(response.data, true);
            },
            // Error callback
            function(response){
                $scope.result = angular.toJson(response.data, true);
            });
    };

});
