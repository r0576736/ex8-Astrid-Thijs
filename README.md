# ex8-Astrid-Thijs

Samengewerkt met Jelle Van Loock, Kevin Aerts en Genzo Vandervelden.

Storage:
  MongoClient installeren om te kunnen connecteren met Mongo.
  Via de url geef je weer wat de naam is van je database ('mongodb://localhost:27017/Drones').
    connect =       functie om te kunnen connecteren met mongdb
    clearDrone =    functie om de opslag 'Drone' leeg te maken.
    insertDrone =   functie om een drone toe te voegen.
    clearFile =     functie om de opslag 'File' leeg te maken.
    insertFile =    functie om een file toe te voegen.
    clearContent =  functie om de opslag 'Content' leeg te maken.
    insertContent = functie om een content toe te voegen.
  Alles linken aan variabele dal. 
  Checken of de Storage werkt via console.log.
  
Main:
  request installeren voor simpele http(s) calls te maken.
  Dal implementeren in de Main.
  "process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";"   --> http(s) connection
  Base url: we geven een basis url mee om gegevens uit te laden.
    var settings=   enkele parameters meegevens zoals de url, GET methode, Json formaat en authorization.
    var Drone =     variabele 'Drone' met zijn attributen
    var File =      variabele 'File' met zijn attributen
    var Content =   variabele 'Content' met zijn attributen
  
  request:
    De gegevens van 'Drones' opvragen met de drone_id.
      De attributen van 'Drones' opvragen.
        De gegevens van 'Files' opvragen met drone_id.
          De gegevens van 'Files' opvragen met file_id.
            De attributen van 'Files' opvragen.
              De gegevens van 'Content' opvragen met file_id.
                De gegevens van 'Content' opvragen met content_id.
                  De attributen van 'Content' opvragen.
   
  Checken of de Main werkt via console.log. 
  --> Werkt niet. Unexpected token u. 
  
  
  Astrid Thijs.
