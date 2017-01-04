//Samenwerking met Jelle Van Loock, Kevin Aerts, Genzo Vandervelden.
//En de code van opdracht 7 van Luc Steffens



var request = require("request");                                               //request installeren
var dal = require('./storage.js');                                              //linken aan dal, opslag

// http://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";                                 


var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";        //basis url, nodig om gegevens uit te laden
var Settings = function (url) {                                                 //variabele settings, met de nodige gegevens, zoals authorization, zeer belangrijk. 
	this.url = BASE_URL + url;
	this.method = "GET";
	this.qs = {format: 'json'};
	this.headers = {
		authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="             
	};
};

var Drone = function (id, name, mac, location, date, files, files_count) {      
	this._id = id;
	this.name = name;                                                       //variabele 'Drone' met zijn attributen
	this.mac = mac;
        this.location = location;
        this.date = date;
        this.files = files;
        this.files_count = files_count;
};

var File = function (id, date_loaded, date_first_record, date_last_record, url, ref, contents, contents_count, droneid) {
	this._id = id;
	this.date_loaded = date_loaded;                                         //variabele 'File' met zijn attributen
	this.date_first_record = date_first_record;
        this.date_last_record = date_last_record;
        this.url = url;
        this.ref = ref;
        this.contents = contents;
        this.contents_count = contents_count;
        this.droneid = droneid;
};

var Content = function (id, mac, datetime, rssi, url, ref, droneid, fileid) {
	this._id = id;                                                          
	this.mac = mac;                                                         //variabele 'Content' met zijn attributen
	this.datetime = datetime;
        this.rssi = rssi;
        this.url = url;
        this.ref = ref;
        this.droneid = droneid;
        this.fileid = fileid;
};

var dronesSettings = new Settings("/drones?format=json");                       //nieuwe settings, json formaat

dal.clearDrone();                                                               //'Drone' leegmaken
dal.clearFile();                                                                //'File' leegmaken
dal.clearContent();                                                             //'Content' leegmaken    

request(dronesSettings, function (error, response, dronesString) {              //droneSettings opvragen
	var drones = JSON.parse(dronesString);

	drones.forEach(function (drone) {                                           
		var droneSettings = new Settings("/drones/" + drone.id + "?format=json");   //gegevens van 'Drones' opvragen met drone_id
		request(droneSettings, function (error, response, droneString) {
			var drone = JSON.parse(droneString);                    
			dal.insertDrone(new Drone(                              
                                drone.id,                                       //attributen die we willen opvragen van 'Drones'                  
                                drone.name, 
                                drone.mac_address, 
                                drone.location, 
                                drone.last_packet_date, 
                                drone.files, 
                                drone.files_count));
                        
                        var filesSettings = new Settings("/files?drone_id.is=" + drone.id + "&format=json&date_loaded.greaterOrEqual=2016-12-07T12:00:00");
                                                                                    
                                                                                // gegevens van 'Files' opvragen met drone_id
                        console.log(filesSettings);
                        request(filesSettings, function (error, response, filesString){
                            var files = JSON.parse(filesString);

                            files.forEach(function (file){
                                var fileSettings = new Settings("/files/" + file.id + "?format=json");  //gegevens van 'Files' opvragen met file_id
                                request(fileSettings, function (error, response, fileString){
                                    var file = JSON.parse(fileString);
                                    //console.log(file);
                                    dal.insertFile(new File(
                                            file.id,                            //attributen die we willen opvragen van 'Files'
                                            file.date_loaded, 
                                            file.date_first_record, 
                                            file.date_last_record,
                                            file.url,
                                            file.ref,
                                            file.contents,
                                            file.contents_count,
                                            drone.id));
                                          
                                    var contentsSettings = new Settings("/files/" + file.id + "/contents?format=json"); 
                                                                                
                                                                                //gegevens van 'Contents' opvragen met file_id                   
                             
                                    request(contentsSettings, function (error, response, contentsString){
                                        var contents = JSON.parse(contentsString);

                                        contents.forEach(function (content){
                                           var contentSettings = new Settings("/files/" + file.id + "/contents/"+content.id+"?format=json");
                                           
                                                                                //gegevens van 'Contents' opvragen met content_id 
                                                                                
                                           request(contentSettings, function (error, response, contentString){
                                               var content = JSON.parse(contentString);
                                               //console.log(content);
                                               dal.insertContent(new Content(
                                                       content.id,              //attributen die we willen opvragen van 'Contents'
                                                       content.mac_address,
                                                       content.datetime,
                                                       content.rssi,
                                                       content.url,
                                                       content.ref,
                                                       file.id,
                                                       drone.id));
                                           });
                                        });
                                });
                            });
                        });
		});
	});
});
});

console.log("Check Drones");                                                    //Drones Checken

//Code werkt niet; Unexpected token u