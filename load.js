var markers = [];
//---Act-Position---
var map = L.map('map').setView([52.520, 13.404], 11);
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(data){
		map.panTo(new L.LatLng(data.coords.latitude, data.coords.longitude));
		map.zoomIn(3);
		var myIcon = L.icon({
		    iconUrl: 'marker-icon.png',
		    shadowUrl: 'http://cdn.leafletjs.com/leaflet-0.7.3/images/marker-shadow.png',
		    iconSize: [25, 41],
		    iconAnchor: [22, 94],
		    popupAnchor: [-9, -87]
		});
		L.circle([data.coords.latitude,data.coords.longitude], 125, {
    		color: 'red',
    		fillColor: '#f03',
    		fillOpacity: 0.5
		}).addTo(map).bindPopup("Ihr Standort").openPopup();
	});
}

$(document).ready(function(){
	$("#map-buttons label").click(function(){
		$(this).toggleClass("checked");
	});
	$("#map-buttons .filter").change(function(){
		for(var i = 0; i < markers.length; i++){
			map.removeLayer(markers[i]);
		}
		getMapData();
	});
});