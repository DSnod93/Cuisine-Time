/* 
Get the location of the user - Lat and Long values
Store lat and long values in a variable
Get the city id from the zomato cities API using lat and long values
Store city id in a variable
Get the cuisine Type from the user
Store it in a variable
Get a list of all cuisines of restaurants listed in the city.
Confirm the user's fav cuisineType is in the list of cuisines
if so, get the cuisine id from the zomato cusines API
Store it in a variable
Now we have cusineid and city id
Get the restaurants lists from the zomato search api with the following inputs in the url : apikey, entity_id (city_id), entity_type( city), cuisineid
display name, location-address, user_rating- aggregate_rating( rating_text), photos_url from the response

*/

// GLobal Variables
// API Keys
const zomato_api_key = "5bb1aedf9a190120f2dd61a33a8368b1";
const maps_api_key = "AIzaSyDEzBEuaOLJJZAyG4HvMvXCkRghvR0AMbU";
var coordinates = [];

$(document).ready(function(){
    init();

function init(){
    // detect current location
    findMe(); 
}


function findMe(){
    $("#find-me").click(function(){
        console.log("button clicked");
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(function(position){
                console.log(position);
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                coordinates.push(lat);
                coordinates.push(lng);
                //console.log(coordinates); 
                return coordinates;
    });
    else    
        console.log("geolocation is not supported");      
    });
};






});









