emcPingApp.config(function($routeProvider) {
    $routeProvider
        // .when("/", {
        //     templateUrl : "index.html"
        // })
        .when("/login", {
            templateUrl : "views/login.html",
            controller: 'loginCtrl'
        })
        .when("/signup", {
            templateUrl : "views/signup.html",
            controller: 'signupCtrl'
        })
        .otherwise({
            templateUrl : "views/emc_ping.html"
        });
});