emcPingApp.controller("pingCtrl", function ($scope, $http) {

    $scope.tags = ["node","done"];

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

    $scope.getTags = function(){
        var $request = $scope.generateRequest("GET",
            "/tags",
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
                console.log("Failed to get tags")
            });
    }

    $scope.getTags();
});
