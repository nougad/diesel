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

function getPlacesByBox(callback, sw_lat, sw_lng, ne_lat, ne_lng, category, search, order) {
  url = "http://api.qype.com/v1/bounding_boxes/"+sw_lat+","+sw_lng+","+ne_lat+","+ne_lng+"/places.json?per_page="+per_page+"&consumer_key="+apikey+"&callback=?"
  if (category != undefined) { url += "&category="+category; }
  if (search   != undefined) { url += "&show="+search;       }
  if (order    == undefined) { url += "&order=distance";     }
  else                       { url += "&order="+order;       }

  $.getJSON(url, function(data) {
    if (data.ok) {
      $.each(data.results, function(i, place) { callback(place); });
    } else {
      // TODO something usefull
      $('<h2>Oops: ' + data.status.error + '</h2>').appendTo('body');
    }
  });
}

