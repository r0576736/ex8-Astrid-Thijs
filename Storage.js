

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/Drones';

var dal = {

	connect: function (error, result) {
		MongoClient.connect(url, function (error, db) {
			if (error)
				throw new Error(error);
			console.log("Connected successfully to server");
			result(db);
                    });
		
	},
        
        clearDrone: function (call) {
		this.connect(null, function (db) {
			db.collection('drones').drop(function (error, result) {
				//callback(result);
				db.close();
			});
		});
	},
	
        insertDrone: function (drone, callback) {
		this.connect(null, function (db) {
			db.collection('drones').insert(drone, function (error, result) {
				//callback(result);
				db.close();
			});
		});
	},
        
        clearFile: function (call) {
		this.connect(null, function (db) {
			db.collection('files').drop(function (error, result) {
				//callback(result);
				db.close();
			});
		});
	},
        
        insertFile: function (file, callback) {
		this.connect(null, function (db) {
			db.collection('files').insert(file, function (error, result) {
				//callback(result);
				db.close();
			});
		});
	},
        
        clearContent: function (call) {
		this.connect(null, function (db) {
			db.collection('contents').drop(function (error, result) {
				//callback(result);
				db.close();
			});
		});
	},
        
        insertContent: function (content, callback) {
		this.connect(null, function (db) {
			db.collection('contents').insert(content, function (error, result) {
				//callback(result);
				db.close();
                        });
                });
            }
        };

        
    module.exports = dal;
    
    console.log("Check Storage");