/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//verdergewerkt op code van Luc Steffens

var request = require("request");
var dal = require('./Storage.js');

// http://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";
var Settings = function (url) {
	this.url = BASE_URL + url;
	this.method = "GET";
	this.qs = {format: 'json'};
	this.headers = {
		authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="
	};
};

var dronesSettings = new Settings("/drones?format=json");

var Drone = function (id, name, mac, location, date, files, files_count) {
	this._id = id;
	this.name = name;
	this.mac = mac;
        this.location = location;
        this.date = date;
        this.files = files;
        this.files_count = files_count;
};

var File = function (id, date_loaded, date_first_record, date_last_record, url, ref, contents, contents_count, droneid) {
	this._id = id;
	this.date_loaded = date_loaded;
	this.date_first_record = date_first_record;
        this.date_last_record = date_last_record;
        this.url = url;
        this.ref = ref;
        this.contents = contents;
        this.contents_count = contents_count;
        this.droneid = droneid;
};

request(dronesSettings, function (error, response, dronesString) {
	var drones = JSON.parse(dronesString);

	drones.forEach(function (drone) {
		var droneSettings = new Settings("/drones/" + drone.id + "?format=json");
		request(droneSettings, function (error, response, droneString) {
			var drone = JSON.parse(droneString);
			dal.insertDrone(new Drone(
                                drone.id, 
                                drone.name, 
                                drone.mac_address, 
                                drone.location, 
                                drone.last_packet_date, 
                                drone.files, 
                                drone.files_count));
                        
                        var filesSettings = new Settings("/files?drone_id.is=" + drone.id + "&format=json&date_loaded.greaterOrEqual=2016-12-07T12:00:00");
                        ///files?drone_id.is=cc3f2b0604a543399edd0d579447513f&date_loaded.greaterOrEqual=2016-10-13T16:40:05.255Z&format=json
                        console.log(filesSettings);
                        request(filesSettings, function (error, response, filesString){
                            var files = JSON.parse(filesString);
 
                            files.forEach(function (file){
                                var fileSettings = new Settings("/files/" + file.id + "?format=json");
                                request(fileSettings, function (error, response, fileString){
                                    var file = JSON.parse(fileString);
                                    //console.log(file);
                                    dal.insertFile(new File(
                                            file.id, 
                                            file.date_loaded, 
                                            file.date_first_record, 
                                            file.date_last_record,
                                            file.url,
                                            file.ref,
                                            file.contents,
                                            file.contents_count,
                                            drone.id));
                                        }); 

                });
            });
        });
        });
        });
        
console.log("Check Drones");