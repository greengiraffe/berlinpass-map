L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'examples.map-i875mjb7'
}).addTo(map);

getMapData();

function pushOnMap(coordinates, anbieter, kurzbeschreibung_des_angebotes, website, preis, zeitliche_begrenzung, schlagworte){
	var show = false;
	var count = $("#map-buttons .filter:checked").length;
	if(count == 0){
		show = true;
	}else{
		$("#map-buttons .filter:checked").each(function(){
			if(schlagworte.split(",").indexOf($(this).attr("id"))){
				show = true;
				return;
			}
		});
	}
		
	if(show){
		if(preis != "") preis_str = "<br>Preis: " + preis; else preis_str = "";
		if(website != ""){
			website_http = url_check(website);
			website_str = "<br>Website: <a href='" + website_http + "' target='_blank'>" + website + "</a>"
		} else website_str = "";
		if(zeitliche_begrenzung != "") zeitliche_begrenzung_str = "<br>Hinweis: " + zeitliche_begrenzung; else zeitliche_begrenzung_str = "";
		var m = L.marker(coordinates).addTo(map);
		m.bindPopup("<b>" + anbieter + "</b><br> Info: " + kurzbeschreibung_des_angebotes + preis_str + website_str + zeitliche_begrenzung_str).openPopup().on('click', function(e){map.panTo(this.getLatLng());});
		markers.push(m);
	}
}

function getMapData(){
	var result = "0,0";
	loadJSON('test_data.json',
	         function(data) { 
	         	for(var i = 0; i < data.index.length; i++){
	         		if(data.index[i].coordinates){
	         			pushOnMap(data.index[i].coordinates, data.index[i].anbieter, data.index[i].kurzbeschreibung_des_angebotes, data.index[i].website, data.index[i].preis, data.index[i].zeitliche_begrenzung, data.index[i].schlagworte);
	         		}
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
	if (!url_to_check.indexOf("http://") == 0)
	{
		website_http_added = "http://" + url_to_check;
		return website_http_added;
	} else return url_to_check;
}
