function addmarker(lat, lng, color, name, link) {
	var myLatlng = new google.maps.LatLng(lat,lng);
	var contentString = '<div id="content">'+
	'<div id="siteNotice">'+
	'<a href="' + link + '" target="_blank">' + name + '</a>';
	'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: './' + color + '.png',
		title: name
	});
	
	markersArray.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}

function addmenu(title) {
	menu = document.getElementById('menu')
	menu.innerHTML = menu.innerHTML + '<a href="#">' + title + "</a><br>"
}

function resetMarkers() {
	if (markersArray) {
		for (i in markersArray) {
			markersArray[i].setMap(null);
		}
	}
}

function askForLatLng(xlat, xlng) {
	lat = xlat
	lng = xlng
}