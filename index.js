(function () {


    var watson = require('watson-developer-cloud');
    var auth = require('./auth')


    // var tone_analyzer =new watson.tone_analyzer(auth.tone_analyzer);




    // tone_analyzer.tone({
    //     text: myText
    // }, function (err, result) {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     //    console.log(JSON.stringify(result,null,2));
    //     var categories = result.document_tone.tone_categories;
    //     categories.forEach(function (category) {
    //         console.log(category.category_name);
    //         category.tones.forEach(function (tone) {
    //             console.log("%s : %s", tone.tone_name, tone.score);

    //         })
    //     })

    // });


    // var language_translator = new watson.LanguageTranslationV2(auth.language_translation);

    // var translateData = function (msg) {

    //     return new Promise(function (resolve, reject) {
            
    //         language_translator.translate({
    //             text: msg,
    //             source: "en",
    //             target: "es"
    //         }, function (err, result) {
    //             if (err) {
    //                 reject(err);
    //             }
    //             //console.log(JSON.stringify(result,null,2));
    //             resolve(result.translations[0].translation);
    //         });


    //     });
    // };


    const watson_convere = new watson.ConversationV1(auth.conversation);

    var conversation = function(msg){
        return new Promise(function(resolve,reject){

        })
    }

    module.exports = {
        //translateData: translateData
        conversation:conversation
    };



})();