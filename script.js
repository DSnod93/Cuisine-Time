var clientId = AYZeCQWCpQsTdWpUCSac081El1TohH_MIM9hbWHfvJPNmJ4pW8DTz237pgzsnd-A2tqrIjztF03itTF8;
 
// Instantiate a map and platform object:
var platform = new H.service.Platform({
  'apikey': '{AIzaSyDIA2cO8tPTISiXdzctlMH6ID19DvMs_fo}'
});
// Retrieve the target element for the map:
var targetElement = document.getElementById('mapContainer');

// Get the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate the map:
var map = new H.Map(
  document.getElementById('mapContainer'),
  defaultLayers.vector.normal.map,
  {
    zoom: 10,
    center: { lat: 52.51, lng: 13.4 }
  });
  

// Create the parameters for the routing request:
var routingParameters = {
  'routingMode': 'fast',
  'transportMode': 'car',
  // The start point of the route:
  'origin': '50.1120423728813,8.68340740740811',
  // The end point of the route:
  'destination': '52.5309916298853,13.3846220493377',
  // Include the route shape in the response
  'return': 'polyline'
};

// Define a callback function to process the routing response:
var onResult = function(result) {
  // ensure that at least one route was found
  if (result.routes.length) {
    result.routes[0].sections.forEach((section) => {
         // Create a linestring to use as a point source for the route line
        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

        // Create a polyline to display the route:
        let routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: 'blue', lineWidth: 3 }
        });

        // Create a marker for the start point:
        let startMarker = new H.map.Marker(section.departure.place.location);

        // Create a marker for the end point:
        let endMarker = new H.map.Marker(section.arrival.place.location);

        // Add the route polyline and the two markers to the map:
        map.addObjects([routeLine, startMarker, endMarker]);

        // Set the map's viewport to make the whole route visible:
        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
    });
  }
};

// Get an instance of the routing service version 8:
var router = platform.getRoutingService(null, 8);

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult,
  function(error) {
    alert(error.message);
  });

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDIA2cO8tPTISiXdzctlMH6ID19DvMs_fo';
script.defer = true;

// Attach your callback function to the `window` object
window.initMap = function() {
  // JS API is loaded and available
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

<div id="map"></div>
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8
});

      
