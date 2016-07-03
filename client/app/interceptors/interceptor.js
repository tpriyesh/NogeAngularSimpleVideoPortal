var addToken = function (Auth, $q) {

    return {
        'request': function (config) {
            config.url = config.url + '?sessionId=' + Auth.sessionId;
            return config;
        }

    }
};

(function(app){
app.factory("addToken", addToken);
})(angular.module("videoportal"));