/* 
Get the location of the user - Lat and Long values
Store lat and long values in a variable
Get the city id from the zomato cities API using lat and long values
Store city id in a variable
Get the cuisine Type from the user
Store it in a variable
Get the restaurants lists from the zomato search api with the following inputs in the url : apikey, entity_id (city_id), entity_type( city), query search
display name, location-address, user_rating- aggregate_rating( rating_text) sorted by rating in descding order from the response
*/

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

// $(document).ready(function(){
//     init();

// function init(){
//     // detect current location
//     findMe(); 
// }

// function findMe(){
//     $("#find-me").click(function(){
//         console.log("button clicked");
//         if(navigator.geolocation)
//             navigator.geolocation.getCurrentPosition(function(position){
//                 console.log(position);
//                 var lat = position.coords.latitude;
//                 var lng = position.coords.longitude;
//                 coordinates.push(lat);
//                 coordinates.push(lng);
//                 //console.log(coordinates); 
//                 return coordinates;
//     });
//     else    
//         console.log("geolocation is not supported");      
//     });
// };
// });

// -------------------------------------------- Workflow -1 -------------------------------------------------
function detectCurrentLocation(){
    locationBtn.addEventListener('click', function(){
        console.log("button clicked");
        getLocation();
    })

    function getLocation()
    {
        console.log("getLocation");
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

function searchRestaurants(){
    console.log("entered searchRes");
    //cityName_userinput = document.getElementById("cityName");
    //console.log(cityName_userinput.value);
    
    //getData_byCityName(cityName_userinput.value);
    var searchBtnEl = document.getElementById("search-btn");
    var userInput_searchFoodEl = document.getElementById("searchFood");
    searchBtnEl.addEventListener("click", function(){
        getData_Restaurants(cityId, userInput_searchFoodEl.value);
        userInput_searchFoodEl.value = '';
    });
};

function getData_Restaurants(cityId, userInput_searchFood){
    var apiUrl    = 'https://developers.zomato.com/api/v2.1/search?entity_id=' +cityId +'&entity_type=city&cuisines=' +userInput_searchFood +'&sort=rating&order=desc';
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
            displayrestaurantsList(data);
        });
};

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
        card.append(cardheader_restName, restRating, restRating_text, restEstablisment,restAddress);
        $("#restaurants-container").append(card);
     }
}

detectCurrentLocation();
searchRestaurants();
//  ------------------------------------ Workflow -2 -----------------------------------------
// function getLocation()
// {
//     console.log("entered getLocation");
// // Check whether browser supports Geolocation API or not
//     if (navigator.geolocation) { // Supported
//         // To add PositionOptions
//         console.log("entered if");
//     navigator.geolocation.getCurrentPosition(getPosition,error);
//     } else 
//     { // Not supported
//     alert("Oops! This browser does not support HTML Geolocation.");
//     }
// }

// function getPosition(position)
// {
//     console.log("entered getPosition");
//     coordinates.push(position.coords.latitude);
//     coordinates.push(position.coords.longitude);
//     getData_City(coordinates);
// }

// function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//     //searchRestaurants();
//     //readUserInput_CityName();

// }

// function getData_byCityName(cityName_userinput){
//     console.log(cityName_userinput);

//     var apiUrl = 'https://developers.zomato.com/api/v2.1/cities?q=' +cityName_userinput;
//     // make a request to the url

//     fetch(apiUrl, {method: "GET", 
//     headers: {
//         "user-key": zomato_api_key
//     }})
//     .then(function(response){
//         //console.log(response);
//         return response.json();
//     })
//     .then(function(data){
//         //cityNameEl.setAttribute("placeholder", cityName);
//         console.log("getData_byCityName:      pick cityid");
//         console.log(data);
//         cityId = data.location_suggestions[0].id;
//         console.log(cityId);
//     });
// };

// function getData_City(coordinates){
//     console.log("entered getData_city");
//     console.log(coordinates[0]);
//     console.log(coordinates[1]);
//     var apiUrl = 'https://developers.zomato.com/api/v2.1/cities?lat=' +coordinates[0] +'&lon=' +coordinates[1];
//     // make a request to the url

//     fetch(apiUrl, {method: "GET", 
//     headers: {
//         "user-key": zomato_api_key
//     }})
//     .then(function(response){
//        // console.log(response);
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//         cityName = data.location_suggestions[0].name;
//         console.log(cityName);
//         cityNameEl.setAttribute("placeholder", cityName);
//         cityId = data.location_suggestions[0].id;
//         return cityId;
//     });
// };

// function searchRestaurants(){
//     var cityName_userinput = document.getElementById("cityName");
//     var userInput_searchFoodEl = document.getElementById("searchFood");
//     var searchBtnEl = document.getElementById("search-btn");
//     searchBtnEl.addEventListener("click", function(){
        
//         getData_Restaurants(getData_byCityName(cityName_userinput.value), userInput_searchFoodEl.value);
//         // cityName_userinput.value = '';
//         // userInput_searchFoodEl.value = '';
//     })

//     function getData_Restaurants(cityId, userInput_searchFood){
//         console.log(cityId);
//         var apiUrl = 'https://developers.zomato.com/api/v2.1/search?entity_id=' +cityId +'&entity_type=city&q=' +userInput_searchFood;
//         fetch(apiUrl, {method: "GET", 
//         headers: {
//             "user-key": zomato_api_key
//         }})
//         .then(function(response){
//             console.log(response);
//             return response.json();
//         })
//         .then(function(data){
//             console.log(data);
//             displayrestaurantsList(data);
//         });
//     };
// }

// function displayrestaurantsList(data){
//     let restaurantsResponselist = data.restaurants;
//    $("#restaurants-container").empty();
//     for (let i = 0; i < restaurantsResponselist.length; i++){
//         const card = $("<div>").addClass("w3-card w3-white");
//         const cardheader_restName = $("<header>").addClass("w3-container w3-black").text(restaurantsResponselist[i].restaurant.name);
//         const restRating = $("<p>").addClass("w3-container").text(restaurantsResponselist[i].restaurant.user_rating.aggregate_rating);
//         const restRating_text = $("<p>").addClass("w3-container").text(restaurantsResponselist[i].restaurant.user_rating.rating_text);
//         const restEstablisment = $("<p>").addClass("w3-container").text(restaurantsResponselist[i].restaurant.establishment[0]);
//         const restAddress = $("<p>").addClass("w3-container").text(restaurantsResponselist[i].restaurant.location.address);
//         card.append(cardheader_restName, restRating, restRating_text, restEstablisment,restAddress);
//         $("#restaurants-container").append(card);
//      }
// }

// getLocation();
// searchRestaurants();

// function readUserInput_CityName(){
//     cityName_userinput = document.getElementById("cityName");
//     console.log(cityName_userinput.value);
//     var newCity = getData_byCityName(cityName_userinput.value);
//     console.log("cityid is :" +newCity);
//     return newCity;
// }

// function readUserInput_CuisineType(){
//     userInput_searchFoodEl = document.getElementById("searchFood");
//     var newCuisineType = userInput_searchFoodEl.value;
//     console.log(newCuisineType);
//     return newCuisineType;

// }

