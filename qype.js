// TODO wth is var?
function getCategories(callback, parent) {
  if (parent == undefined) {
    return $.getJSON("http://api.qype.com/v1/place_categories.json?consumer_key="+apikey+"&callback=?", callback);
  } else {
    url = $.grep(parent.category.links,function(elementOfArray, indexInArray) {
      return elementOfArray.rel == "http://schemas.qype.com/place_categories.children";
    }).href;
    return $.getJSON(url + ".json" + "&consumer_key="+apikey+"&callback=?", callback);
  }
}

function getCurrentGeoLocation(callback) {
  var errorCallback = function(error) {
    // TODO something usefull
    $('<h2>Oops: GPS fail ' + error.code+'</h2>').appendTo('body');
  }

  var successCallback = function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    callback(latitude, longitude);
  }

  if (typeof (navigator.geolocation) != 'undefined') {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { enableHighAccuracy: true, maximumAge: 10000 });
  } else {
    // TODO something usefull
    $('<h2>Oops: No location available</h2>').appendTo('body');
  }
}
