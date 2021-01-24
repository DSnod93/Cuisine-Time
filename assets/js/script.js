/* 
Get the location of the user - Lat and Long values
Store lat and long values in a variable
Get the city id from the zomato cities API using lat and long values
Store city id in a variable
Get the cuisine Type from the user
Store it in a variable
Now we have cusineType and city id
Get the restaurants lists from the zomato search api with the following inputs in the url : apikey, entity_id (city_id), entity_type( city), cuisineid
display name, location-address, user_rating- aggregate_rating( rating_text), photos_url from the response

*/

// GLobal Variables
// API Keys
const zomato_api_key = "5bb1aedf9a190120f2dd61a33a8368b1";
const maps_api_key = "AIzaSyDEzBEuaOLJJZAyG4HvMvXCkRghvR0AMbU";
var coordinates = [];
var cityNameEl = document.getElementById("cityName");
var cityId;
var cityName;
var cuisineId;
var locationBtn = document.getElementById("find-me");
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function detectCurrentLocation(){
locationBtn.addEventListener('click', function(){
    console.log("button clciked");
    getLocation();
})

function getLocation()
{
// Check whether browser supports Geolocation API or not
if (navigator.geolocation) { // Supported
    // To add PositionOptions
navigator.geolocation.getCurrentPosition(getPosition,error, options);
} else 
{ // Not supported
alert("Oops! This browser does not support HTML Geolocation.");
}
}

function getPosition(position)
{
    coordinates.push(position.coords.latitude);
    coordinates.push(position.coords.longitude);
    getData_City(coordinates);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getData_City(coordinates){
    console.log(coordinates[0]);
    console.log(coordinates[1]);
    var apiUrl = 'https://developers.zomato.com/api/v2.1/cities?lat=' +coordinates[0] +'&lon=' +coordinates[1];
    // make a request to the url

    fetch(apiUrl, {method: "GET", 
    headers: {
        "user-key": zomato_api_key
    }})
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        //console.log(data.location_suggestions[0].name);
        cityName = data.location_suggestions[0].name;
        cityNameEl.setAttribute("placeholder", cityName);
       cityId = data.location_suggestions[0].id;
    });
};

}

detectCurrentLocation();

function displayRestaurants(){
    var searchBtnEl = document.getElementById("search-btn");
    var userInput_searchFoodEl = document.getElementById("searchFood");
    searchBtnEl.addEventListener("click", function(){
        getData_Restaurants(cityId, userInput_searchFoodEl.value);
        userInput_searchFoodEl.value = '';
    })

    function getData_Restaurants(cityId, userInput_searchFood){
        var apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=' +cityId +'&entity_type=city&q=' +userInput_searchFood;
        fetch(apiUrl, {method: "GET", 
        headers: {
            "user-key": zomato_api_key
        }})
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data);
            //let restaurantslist = data.restaurants;
            for (var i=0; i<data.restaurants.length; i++){
                console.log(data.restaurants[i].restaurant.name);
                console.log(data.restaurants[i].restaurant.user_rating.aggregate_rating);
                console.log(data.restaurants[i].restaurant.establishment[0]);
                console.log(data.restaurants[i].restaurant.location.address);
            }
        });
    };
}


displayRestaurants();
