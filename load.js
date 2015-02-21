document.getElementById("map").style.height = window.innerHeight+"px";

//---Act-Position---
var map = L.map('map').setView([52.520, 13.404], 13);
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(data){
		map.panTo(new L.LatLng(data.coords.latitude, data.coords.longitude));
	});
}