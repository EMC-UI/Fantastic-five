emcPingApp.controller("tagCtrl", function ($scope, $http, $routeParams, searchService, $location) {

    $scope.ip = "128.222.159.134";
    $scope.port = 3000;

    $scope.generateRequest = function($method, $path, $header, $data, $params) {
        return {
            method: $method,
            url: "http://"+$scope.ip+":"+$scope.port+"/api"+$path,
            headers: $header,
            data: $data,
            params: $params
        };
    };

    $scope.getQuestions = function(){
        console.log($routeParams);
        var $request = $scope.generateRequest("GET",
            "/tags",
            {'Content-Type': 'application/json'},
            {},
            {tag: $routeParams.tagName}
        );
        console.log("tag Request: " + $request);
        $http($request).then(
            //Success callback
            function(response){
                //$scope.tags = response.data.tags;
                console.log(response.data);
                searchService.setsearchResults(response.data);
                $location.url("/searchQuestion");
            },
            // Error callback
            function(response){
                console.log("Failed to get questions associated with tags")
            });
    }

    $scope.getQuestions();

});
