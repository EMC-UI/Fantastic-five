/**
 * Created by narrah on 8/30/16.
 */
emcPingApp.factory("questionService", function(){
    var question = "";

    var setQuestion = function(quest){
        question = quest;
    }

    var getQuestion = function(){
        return question;
    }

    return {
        setQuestion: setQuestion,
        getQuestion: getQuestion
    };
});