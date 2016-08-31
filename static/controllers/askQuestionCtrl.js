/**
 * Created by narrah on 8/29/16.
 */
emcPingApp.controller('askQuestionCtrl', function($scope, loginService, $rootScope, $http){
        $scope.submit = function(){
            $scope.newformData = {};
            //$scope.newformData.token = loginService.getToken();
            $scope.newformData.title = $scope.formData.title;
            $scope.newformData.content = $scope.formData.content;
            $scope.newformData.tags = $scope.formData.tags;


            console.log($scope.newformData);
            //$http.post('http://128.222.159.134:3000/api/questions', $scope.newformData, {header: {'token': loginService.getToken()}})

            $http({
                method: "POST",
                url: "http://localhost:3000/api/questions",
                headers: {'token': loginService.getToken()},
                data: $scope.newformData
            }).then(function(response){
                        console.log("Question Posted Successfully");
                        $scope.message = "Question Posted Successfully";
                    },
                    function(response){
                        console.log("Question could not be posted");
                        $scope.message = response.data.error;
                    });
        };

});
