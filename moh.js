/*
    Gets Meters Above Sea Level from Statens kartverk web server
*/
function hentMOHFraKartverket(lat, lon, callback) {
    var url = "http://openwps.statkart.no/skwms1/wps.elevation?request=Execute&service=WPS&version=1.0.0&identifier=elevation&datainputs=%5blat=" + lat + ";lon=" + lon + ";epsg=4326%5d";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        var xml = xhr.response;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xhr.response, "text/xml");
        var outputs = xmlDoc.childNodes[0].childNodes[5];
        var moh = outputs.childNodes[5].childNodes[5].textContent;
        moh = moh.replace(/\s/g, '');
        console.log("moh=" + moh);
        callback(moh);
    }
    xhr.send();
}




