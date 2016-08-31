angular.module('emcping').controller("pingCtrl", function ($scope, $http) {

    $scope.tags = [];

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

    $scope.getTags = function(){
        var $request = $scope.generateRequest("GET",
            "/tags",
            {'Content-Type': 'application/json'}
        );

        $http($request).then(
            //Success callback
            function(response){
                //$scope.tags = response.data.tags;
                //console.log(tags);
                console.log(response.data);
                for(i=0; i<response.data.length; i++){
                    //console.log(response.data[i]);
                    for(j=0; j<response.data[i].tags.length; j++){
                        if($scope.tags.indexOf(response.data[i].tags[j]) == -1)
                            $scope.tags.push(response.data[i].tags[j]);
                    }
                }
                console.log($scope.tags);
            },
            // Error callback
            function(response){
                console.log("Failed to get tags")
            });
    }

    $scope.getTags();
});
