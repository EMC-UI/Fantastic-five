/**
 * Created by narrah on 8/30/16.
 */
emcPingApp.factory("searchService", function(){
    var searchResults = "";

    var setsearchResults = function(result){
        searchResults = result;
    }

    var getsearchResults = function(){
        return searchResults;
    }

    return {
        setsearchResults: setsearchResults,
        getsearchResults: getsearchResults
    };
});