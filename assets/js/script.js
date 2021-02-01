// Fetch the current location and the restaurants details based on the user input using geolocation API and Zomato API


// GLobal Variables
// API Keys
const zomato_api_key = "5bb1aedf9a190120f2dd61a33a8368b1";
var coordinates = [];
var cityNameEl = document.getElementById("cityName");
var cityId;
var cityName;
var cityName_userinput;
var locationBtn = document.getElementById("find-me");
var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};
// uses GeoLocation API to detect and populate current location of the user
function detectCurrentLocation(){
    locationBtn.addEventListener('click', function(){
        getLocation();
    })

    function getLocation()
    {
        //console.log("getLocation");
    // Check whether browser supports Geolocation API or not
    if (navigator.geolocation) { // Supported
        // To add PositionOptions
    navigator.geolocation.getCurrentPosition(getPosition,error,options);
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

    // Fetch the city id
    function getData_City(coordinates){
        // console.log(coordinates[0]);
        // console.log(coordinates[1]);
        var apiUrl = 'https://developers.zomato.com/api/v2.1/cities?lat=' +coordinates[0] +'&lon=' +coordinates[1];
        // make a request to the url

        fetch(apiUrl, {method: "GET", 
        headers: {
            "user-key": zomato_api_key
        }})
        .then(function(response){
            //console.log(response);
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

// fetch the restaurants based on cusine type and city id
function searchRestaurants(){
    var searchBtnEl = document.getElementById("search-btn");
    var userInput_searchFoodEl = document.getElementById("searchFood");
    searchBtnEl.addEventListener("click", function(){
        saveToLocalStorage();
        getData_Restaurants(cityId, userInput_searchFoodEl.value);
        userInput_searchFoodEl.value = '';
    });
};

function getData_Restaurants(cityId, userInput_searchFood){
    var apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=' +cityId +'&entity_type=city&q=' +userInput_searchFood +'&sort=rating&order=desc';
        fetch(apiUrl, {method: "GET", 
        headers: {
            "user-key": zomato_api_key
        }})
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            // console.log('restaurantData');
            // console.log(data);
            displayrestaurantsList(data);
            displayMap(data);
        });
};

// display the search results dynamically
function displayrestaurantsList(data){
    let restaurantsResponselist = data.restaurants;
    $("#restaurants-container").empty();
    for (let i = 0; i < restaurantsResponselist.length; i++){
        const card = $("<div>").addClass("w3-card w3-white");
        const cardheader_restName = $("<header>").addClass("w3-container w3-black").text(restaurantsResponselist[i].restaurant.name);
        const restRating = $("<p>").addClass("w3-container").text(restaurantsResponselist[i].restaurant.user_rating.aggregate_rating);
        const restRating_text = $("<p>").addClass("w3-container").text(restaurantsResponselist[i].restaurant.user_rating.rating_text);
        const restEstablisment = $("<p>").addClass("w3-container").text(restaurantsResponselist[i].restaurant.establishment[0]);
        const restAddress = $("<p>").addClass("w3-container").text(restaurantsResponselist[i].restaurant.location.address);
        card.append(cardheader_restName, restRating, restRating_text, restEstablisment, restAddress);
        $("#restaurants-container").append(card);
    };
};


// store the last typed cuisine type in the local storage and populate it as a placeholder for reference
function saveToLocalStorage(){
    console.log("entered saved localstorage");
    var userInput_searchFoodEl = document.getElementById("searchFood");
    //var favArray={};
    //console.log({favArray});
    var bookmarkedItem = userInput_searchFoodEl.value;
    //favArray.push(bookmarkedItem.value);
    console.log(bookmarkedItem);
    localStorage.setItem('bookmarkedItem', JSON.stringify(bookmarkedItem));

    var storedItem = JSON.parse(localStorage.getItem('bookmarkedItem'));
    userInput_searchFoodEl.setAttribute('placeholder', storedItem);
    console.log(storedItem);
};

detectCurrentLocation();
searchRestaurants();