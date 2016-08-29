/**
 * Created by narrah on 8/29/16.
 */
var userDetailsApp = angular.module('emcping', []);

userDetailsApp.controller('signupController', function($scope, $http){

    $scope.areStringsEqual = function(password, confirmpassword){
        if(password==confirmpassword){
            console.log("true");
            return true;
        }
        else{
            console.log("false");
            return false;
        }
    };

    $scope.submit = function(){
        $http.post('http://128.222.159.134:3000/api/users/signup', $scope.formData)
            .then(function(data){
                console.log("Successfull signup");
                $scope.message = "Signup successful";
            },
        function(response){
            console.log("Signup failed");
            $scope.message = "Username already exists. Use a different username.";
        });
    };

});