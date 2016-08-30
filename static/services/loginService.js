emcPingApp.factory("loginService", function(){
    var token = "";

    var setToken = function(tok){
        token = tok;
    }

    var getToken = function(tok){
        return token;
    }

    return {
        setToken: setToken,
        getToken: getToken
    };
});
