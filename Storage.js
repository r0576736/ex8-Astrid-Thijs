

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/Drones';

var dal = {

	connect: function (err, result) {
		MongoClient.connect(url, function (error, db) {
			if (error)
				throw new Error(error);
			console.log("Connected successfully to server");
			result(db);
		});
	},
        
        clearDrone: function (call) {
		this.connect(null, function (db) {
			db.collection('drones').drop(function (err, result) {
				//callback(result);
				db.close();
			});
		});
	},
	
        insertDrone: function (drone, callback) {
		this.connect(null, function (db) {
			db.collection('drones').insert(drone, function (err, result) {
				//callback(result);
				db.close();
			});
		});
	},
        
        clearFile: function (call) {
		this.connect(null, function (db) {
			db.collection('files').drop(function (err, result) {
				//callback(result);
				db.close();
			});
		});
	},
        
        insertFile: function (file, callback) {
		this.connect(null, function (db) {
			db.collection('files').insert(file, function (err, result) {
				//callback(result);
				db.close();
			});
		});
	}
    };
        
    module.exports = dal;
    
    console.log("Check Storage");