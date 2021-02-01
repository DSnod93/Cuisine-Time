// Fetch the static map and display on the page using Here API


function displayMap(data) {
    var lat = data.restaurants[0]['restaurant']['location']['latitude'];
    var lon = data.restaurants[0]['restaurant']['location']['longitude'];
    var apiKey = 'c5VmyaK5h93ma5QXUQ4mTtLsOWLdZK9Nqtugji5W8k4';
    var platform = new H.service.Platform({
     'apikey': apiKey
     });
  
  // Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('maps-container'),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: { lat: lat, lng: lon }
    });
}
