//---global variables---
var markers = [];
var map = "";
var search;
var current_position;

//---logic---
initializeMap();
getGeoLocation();
getMapData();

//---jQuery events---
$(document).ready(function(){
	//---button show{
	$(".little-button").click(function(){
		var datafor = $(this).attr("data-for");
		$(".showing").not("#"+datafor).removeClass("showing");
		$("#"+datafor).toggleClass("showing");
	});
	//}
	//---filter by category{
	$("#map-buttons label").click(function(){
		$(this).toggleClass("checked");
	});
	$("#map-buttons .filter").change(function(){
		delete_all_markers();
		getMapData();
	});
	//---}
	//---filter by search topic{
	$("#search-field-button").click(function(){
		search_markers();
	});

	$("#search-field").change(function(){
		search_markers();
	});
	//}
	//---get current position{
	$("#localize-button").click(function(){
		getGeoLocation();
	});
	//}
});

//---functions---
function initializeMap(){
	map = L.map('map').setView([52.520, 13.404], 11);
	L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'examples.map-i875mjb7'
	}).addTo(map);
}

function getGeoLocation () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(data){
			map.panTo(new L.LatLng(data.coords.latitude, data.coords.longitude));
			map.zoomIn(3);
			current_position ? map.removeLayer(current_position) : null;
			current_position = L.circle([data.coords.latitude,data.coords.longitude], 125, {
	    		color: 'red',
	    		fillColor: '#f03',
	    		fillOpacity: 0.5
			}).addTo(map)
			current_position.bindPopup("Ihr Standort").openPopup();
		});
	}
}

function getMapData(){
	var result = "0,0";
	loadJSON('NewJson.json',
	         function(data) { 
	         	for(var i = 0; i < data.index.length; i++){
	         		if(data.index[i].coordinates){
	         			pushOnMap(data.index[i].coordinates, data.index[i].anbieter, data.index[i].kurzbeschreibung_des_angebotes, data.index[i].website, data.index[i].preis, data.index[i].zeitliche_begrenzung, data.index[i].schlagworte, data.index[i].address);
	         		}
	         	}
	         },
	         function(xhr) { result = xhr }
	);
}

function loadJSON(path, success, error){
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

function pushOnMap(coordinates, anbieter, kurzbeschreibung_des_angebotes, website, preis, zeitliche_begrenzung, schlagworte, address){
	var show = [];
	//---filter by category---
	var count = $("#map-buttons .filter:checked").length;
	if(count == 0){
		show[0] = true;
	}else{
		$("#map-buttons .filter:checked").each(function(){
			if(schlagworte.split(",").indexOf($(this).attr("data-value")) > -1){
				show[0] = true;
				return;
			}
		});
	}
	//---filter by search topic---
	if(search != "" && search){
		var lowerCaseSearch = search.toLowerCase();
		if(anbieter.toLowerCase().search(lowerCaseSearch) > -1 || kurzbeschreibung_des_angebotes.toLowerCase().search(lowerCaseSearch) > -1 || schlagworte.toLowerCase().search(lowerCaseSearch) > -1 || address.toLowerCase().search(lowerCaseSearch) > -1){
			show[1] = true;
		}else{
			show[1] = false;
		}
	}else{
		show[1] = true;
	}

	if(show.allTrue()){
		if(address != "") address_str = "<br>Adresse: " + address + "<br><br>"; else address_str = "";
		if(preis != "") preis_str = "<br>Preis: " + preis; else preis_str = "";
		if(website != ""){
			website_http = url_check(website);
			website_str = "<br>Website: <a href='" + website_http + "' target='_blank'>" + website + "</a>"
		} else website_str = "";
		if(zeitliche_begrenzung != "") zeitliche_begrenzung_str = "<br>Hinweis: " + zeitliche_begrenzung; else zeitliche_begrenzung_str = "";
		var m = L.marker(coordinates).addTo(map);
		m.bindPopup("<b>" + anbieter + "</b><br>" + address_str + "Info: " + kurzbeschreibung_des_angebotes + preis_str + website_str + zeitliche_begrenzung_str).on('click', function(e){map.panTo(this.getLatLng());});
		markers.push(m);
	}
}

function url_check(url_to_check)
{
	if (!url_to_check.indexOf("http://") == 0)
	{
		website_http_added = "http://" + url_to_check;
		return website_http_added;
	} else return url_to_check;
}

function delete_all_markers(){
	for(var i = 0; i < markers.length; i++){
		map.removeLayer(markers[i]);
	}
}

function search_markers(){
	search = $("#search-field").val();
	delete_all_markers();
	getMapData();
}

Array.prototype.allTrue = function(){
	for (i = 0; i < this.length; i++) {
        if(!this[i]){
        	return false;
        }
    }
    return true;
}
