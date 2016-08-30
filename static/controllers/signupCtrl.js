emcPingApp.controller('signupCtrl', function($scope, loginService, $rootScope, $http){

    $scope.areStringsEqual = function(password, confirmpassword){
        if(password==confirmpassword){
            console.log(loginService.getToken());
            return true;
        }
        else{
            return false;
        }
    };

    $scope.submit = function(){
        $http.post('http://128.222.159.134:3000/api/users/signup', $scope.formData)
            .then(function(data){
                console.log("Successful signup");
                $scope.message = "Signup successful";
                loginService.setToken(data.data.token);
            },
        function(response){
            console.log("Signup failed");
            $scope.message = "Username already exists. Use a different username.";
        });
    };

});