document.getElementById("map").style.height = window.innerHeight+"px";

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
		L.marker([data.coords.latitude,data.coords.longitude], {icon: myIcon}).addTo(map).bindPopup("[52.5155098,13.3847539]").openPopup();
	});
}