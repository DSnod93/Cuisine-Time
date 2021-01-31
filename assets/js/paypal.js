function displayMap(data) {
var lat = data.restaurants[0]['restaurant']['location']['latitude'];
var lon = data.restaurants[0]['restaurant']['location']['longitude'];
var apiKey = 'c5VmyaK5h93ma5QXUQ4mTtLsOWLdZK9Nqtugji5W8k4';
 console.log(`lat:${lat}`);
 console.log(`lon:${lon}`);
console.log(data);
//function initMap() {
var platform = new H.service.Platform({
    //'app_id': 'HeTdK9OpWo0W8nlxtHka',
    'apikey': apiKey,
    //'bearer': true

    
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

    
// initMap();

// var routingParameters = {
//     'routingMode': 'fast',
//     'transportMode': 'car',
//     // The start point of the route:
//     'origin': '',
//     //The end point of the route:
//     'destination': '',
//     // Include the route shape in the response
//     'return': 'polyline'
// };
