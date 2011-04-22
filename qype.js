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


