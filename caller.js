(function () {

    var caller = require('./clouddb');
    var messageText = 'i love you!';

    // var response = caller.saveToDB(messageText);
    // response.then(function (data) {
    //     console.log('rev Id--' + data.rev + "-" + data.ok);
    // });

    var searchResult = caller.findUser('facebookUserID');
    searchResult.then(function (data) {
        console.log(JSON.stringify(data, null, 2))
    }).catch(function(reason){

        console.log(JSON.stringify(reason, null, 2))
    })


})();
