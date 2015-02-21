document.getElementById("map").style.height = window.innerHeight+"px";

var map = L.map('map').setView([52.520, 13.404], 13);
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(data){
		map.panTo(new L.LatLng(data.coords.latitude, data.coords.longitude));
	});
}

		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-i875mjb7'
		}).addTo(map);

getMapData();

function pushOnMap(coordinates, anbieter, kurzbeschreibung_des_angebotes, website, preis, zeitliche_begrenzung){
	website_http = url_check(website);
	L.marker(coordinates).addTo(map).bindPopup("<b>" + anbieter + "</b><br> Info: " + kurzbeschreibung_des_angebotes + "<br> Preis: " + preis + "<br> Website: <a href='" + website_http + "' target='_blank'>" + website + "</a>").openPopup();
}

function getMapData(){
	var result = "0,0";
	loadJSON('test_data.json',
	         function(data) { 
	         	for(var i = 0; i < data.index.length; i++){
	         		pushOnMap(data.index[i].coordinates, data.index[i].anbieter, data.index[i].kurzbeschreibung_des_angebotes, data.index[i].website, data.index[i].preis, data.index[i].zeitliche_begrenzung); 
	         	}
	         },
	         function(xhr) { result = xhr }
	);
}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function url_check(url_to_check)
{
	if (!url_to_check.startsWith("http://"))
	{
		website_http_added = "http://" + url_to_check;
		return website_http_added;
	} else return url_to_check;
}
