(function () {

    var Cloudant = require('cloudant');
    var dbTemplates = require('./dbTemplates');
    var me = '2651d3f9-2768-43d4-b91a-7e5b74528b7e-bluemix'; // Set this to your own account 
    var password = '85fcb4d028e91ad83796be3d8be67ddb7d26882a8ac8401c3ad63996fcc88e0c';

    // Initialize the library with my account. 
    var cloudant = Cloudant({
        account: me,
        password: password,
        plugin: 'promises'
    });


    cloudant.db.list().then(function (data) {
        console.log(JSON.stringify(data, null, 2));
    })


    var usersdb = cloudant.db.use('userdb'),
        chatdb = cloudant.db.use('chatdb'),
        ticketsdb = cloudant.db.use('ticketsdb');

    // usersDB.list().then(function (data) {
    //     console.log(JSON.stringify(data, null, 2));
    // }).catch(function (err) {
    //     console.log(err);
    // })



    //Create a new Document in database
    //@dbName: Database Name in which document to be created
    //@dataJSONObject: Json Data to be stored in the database
    //@documentKey: Unique Id for the document
    var saveToDB = function (dbName, dataJSONObject, documentKey) {
        return new Promise(function (resolve, reject) {
            //call insert function 
            dbName.insert(dataJSONObject, documentKey, function (err, body, header) {
                if (err) {
                    reject(err.message);
                    //return console.log('[alice.insert] ', err.message);
                }

                //console.log('You have inserted the rabbit.');
                console.log(JSON.stringify(body, null, 2));
                resolve(body);
            });
        });
    };


    //....Check if any Document exists with a given Key and return that object
    //@dbName: Database Name in which document to be searched
    //@queryDocumentKey: Unique Id for the document
    //....returns:
    //document object with queryDocumentKey
    //returns error if no document available with specific id


    var queryDocumentID = function (databaseName, query) {
        return new Promise(function (resolve, reject) {

            //form a query to search 


            console.log(JSON.stringify(query, null, 2))

            databaseName.find(query, function (err, data) {
                if (err) {
                    console.log("Query Documents Error \n" + JSON.stringify(err, null, 2));
                    reject(err);
                }
                else if (data) {


                    // console.log(
                    //     "Query Documents Result \n"
                    //     + JSON.stringify(data.docs[0], null, 2)
                    // );

                    resolve(data.docs[0]);
                }

            });
        });
    };



    //update a existing Document in database
    //@dbName: Database Name in which document to be created.
    //@dataJSONObject: Json Data to be stored in the database.

    var udpateToDB = function (databaseName, dataJSONObject) {

        return new Promise(function (resolve, reject) {
            //call insert function 
            databaseName.insert(dataJSONObject, function (err, body, header) {

                if (err) {
                    reject(err.message);
                    //return console.log('[alice.insert] ', err.message);
                }

                else if (body) {
                    //console.log('You have inserted the rabbit.');
                    console.log("update action \n" + JSON.stringify(body, null, 2));
                    resolve(body);
                }


            });


        });

    };


    var updateExistingTicket = function () {

        var selectorValue = 'ticketID';

        var query = {
            "selector": {
                "_id": selectorValue
            }
        };

        var doc = queryDocumentID(ticketsdb, query);
        doc.then(function (data) {
            console.log(
                "Query Documents Result \n"
                + JSON.stringify(data, null, 2)
            );

            var currentDate = new Date();

            data.Date.Modified = currentDate;
            data.Comments.push({
                "commentBy": "Person" + currentDate.getTime(),
                "commentTime": "Comment Time" + currentDate.getTime()
            })

            console.log(
                "updatedJson \n"
                + JSON.stringify(data, null, 2)
            );

            udpateToDB(ticketsdb,data);


        }).catch(function (err) {
            console.log(err.message);
        });

    };

    updateExistingTicket();







    // //new Ticket Creation Code
    // saveToDB(ticketsdb, dbTemplates.new_ticket_template, dbTemplates.new_ticket_template._id + (new Date().getTime()));


    var getUserDetails = function (userSearchID) {

        return new Promise(function (resolve, reject) {


            usersDB.get(userSearchID, function (err, body, header) {
                if (err) {
                    reject(err);
                } else {

                    resolve(body);
                }
            })
        })
    };


    // var search = getUserDetails('facebookUserID1');
    // search
    //     .then(function (body) {
    //         console.log(JSON.stringify(body, null, 2));
    //     })
    //     .catch(function (rejectionReason) {
    //         console.log(JSON.stringify(rejectionReason, null, 2))
    //     });








    //query db 
    // var qUserDb = queryUserDb('facebookUserID2');
    // qUserDb.then(function (userObject) {
    //     console.log(userObject);
    //     userObject.name = 'vajrang1';
    //     udpateToDB(userObject);

    // })






    // module.exports = {
    //     saveToDB: saveToDB,
    //     findUser: findUser
    // };

})();

// cloudant.db.list(function (err, allDbs) {
//     console.log('All my databases: %s', allDbs.join(', '))
// });

// Remove any existing database called "alice". 
// cloudant.db.destroy('alice', function (err) {

//     // Create a new "alice" database. 
//     cloudant.db.create('alice', function () {

        // Specify the database we are going to use (alice)... 
        // var alice = cloudant.db.use('alice')
        // alice.list().then(function(data){
        //     console.log(JSON.stringify(data,null,2));
        // }).catch(function(err){
        //     console.log(err);
        // })

        // ...and insert a document in it. 
        // alice.insert({ crazy: 'tru1' },'id1', function (err, body, header) {
        //     if (err) {
        //         return console.log('[alice.insert] ', err.message);
        //     }

        //     console.log('You have inserted the rabbit.');
        //     console.log(body);
        //  });
//     });
// });