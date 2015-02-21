var map = L.map('map').setView([52.520, 13.404], 13);

		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-i875mjb7'
		}).addTo(map);

// neuer Code von Andreas
var pathOfFileToRead = "test_data.json";

//var geojsonFeature = FileHelper.readStringFromFileAtPath ( pathOfFileToRead );
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Acud Kino",
        "amenity": "...",
        "popupContent": "Hier ist es!"
    },
    "geometry": {
        "type": "marker",
        "coordinates": [52.533469, 13.701743]
    }
};

//L.geoJson(geojsonFeature).addTo(map);

//L.marker([52.533469, 13.401743]).addTo(map)

// Ende neuer Code von Andreas


		/*L.marker([51.5, -0.09]).addTo(map)
			.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

		L.circle([51.508, -0.11], 500, {
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5
		}).addTo(map).bindPopup("I am a circle.");

		L.polygon([
			[51.509, -0.08],
			[51.503, -0.06],
			[51.51, -0.047]
		]).addTo(map).bindPopup("I am a polygon.");


		var popup = L.popup();

		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}

		map.on('click', onMapClick);*/

getMapData();
function getMapData(){
	loadJSON('test_data.json',
	         function(data) { alert(data.index[0].anbieter); },
	         function(xhr) { alert(xhr); }
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
