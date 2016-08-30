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

        .when("/askQuestion", {
            templateUrl : "views/askQuestion.html",
            controller: 'askQuestionCtrl'
        })
        .when("/searchQuestion", {
            templateUrl : "views/searchQuestion.html",
            controller: 'searchQuestionCtrl'
        })
        .when("/showQuestion", {
            templateUrl : "views/showQuestion.html",
            controller: 'showQuestionCtrl'
        })

        .otherwise({
            templateUrl : "views/emc_ping.html"
        });
});