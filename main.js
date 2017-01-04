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

                });
            });
        });
            
console.log("Check Drones");