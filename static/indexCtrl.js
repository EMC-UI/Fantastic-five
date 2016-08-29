emcPingApp.controller("indexCtrl", function($scope, $window) {

    $scope.login = function() {
        console.log("login page");
        window.location = "app/login.html";
    }

    $scope.register = function() {
        $window.location = "app/signup.html";
    }

});