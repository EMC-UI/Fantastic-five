emcPingApp.controller("pingCtrl", function ($scope, $http, $routeParams) {

    $scope.tagName = $routeParams.tagName;

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

    $scope.getQuestions = function(){
        var $request = $scope.generateRequest("GET",
            "/tags/"+$scope.tagName,
            {'Content-Type': 'application/json'}
        );

        $http($request).then(
            //Success callback
            function(response){
                //$scope.tags = response.data.tags;
                console.log(response.data);
            },
            // Error callback
            function(response){
                console.log("Failed to get questions associated with tags")
            });
    }

    //$scope.getQuestions();

});
