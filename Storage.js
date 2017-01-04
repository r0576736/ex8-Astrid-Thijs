

var MongoClient = require('mongodb').MongoClient;                               //Mongo installeren om te kunnen connecteren
var url = 'mongodb://localhost:27017/Drones';                                   //hier bevindt onze data ('./Drones)


var dal = {

	connect: function (error, result) {                                     //connecteren met mongo
		MongoClient.connect(url, function (error, db) {
			if (error)                                              //als het mis gaat, error
				throw new Error(error);
			console.log("Connected successfully to server");        //anders "Succesfully connected"
			result(db);
                    });
		
	},
        
        clearDrone: function (call) {                                           //'Drone' leegmaken
		this.connect(null, function (db) {
			db.collection('drones').drop(function (error, result) { 
				//callback(result);
				db.close();                                     //database 'Drones' sluiten
			});
		});
	},
	
        insertDrone: function (drone, callback) {                               //drone toevoegen 
		this.connect(null, function (db) {
			db.collection('drones').insert(drone, function (error, result) {    
				//callback(result);
				db.close();                                     //database sleiten
			});
		});
	},
        
        clearFile: function (call) {                                            //'File' leegmaken
		this.connect(null, function (db) {
			db.collection('files').drop(function (error, result) {
				//callback(result);
				db.close();                                     //database sluiten
			});
		});
	},
        
        insertFile: function (file, callback) {                                 //file toevoegen
		this.connect(null, function (db) {
			db.collection('files').insert(file, function (error, result) {
				//callback(result);
				db.close();                                     //database sluiten
			});
		});
	},
        
        clearContent: function (call) {                                         //'Content' leegmaken
		this.connect(null, function (db) {
			db.collection('contents').drop(function (error, result) {
				//callback(result);                 
				db.close();                                     //database sluiten
			});
		});
	},
        
        insertContent: function (content, callback) {                           //content toevoegen
		this.connect(null, function (db) {
			db.collection('contents').insert(content, function (error, result) {
				//callback(result);
				db.close();                                     //database sluiten
                        });
                });
            }
        };

        
    module.exports = dal;                                                       //alles linken aan variabele 'dal'
    
    console.log("Check Storage");                                               //Storage checken