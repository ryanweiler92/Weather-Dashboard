//input form element for city search
var citySearchInput = document.getElementById("city-search");
//submit button element for city search
var citySearchBtn = document.getElementById("search-btn")
//unorder list element for city search history
var searchHistoryList = document.getElementById("search-history");
//all forecast cards
var forecastCards = document.querySelectorAll(".forecast")

//CURENT WEATHER VARIABLES
var city = document.getElementById("city-name");
var icon = document.getElementById("weather-icon");
var date = document.getElementById("date");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uv = document.getElementById("UV")

//empty object
var citySearchDataList = []

//variable to assign id's to each city search history
var cityCount = 0



var createCities = function(e){
    
    //prevents page from refreshing
    e.preventDefault();

    //create li element
    var searchHistoryEl = document.createElement("li");
    searchHistoryList.appendChild(searchHistoryEl);

     
    //create button element with city value
    var searchHistoryButton = document.createElement("button");
    searchHistoryButton.classList = 'btn mt-3 city-button';
    searchHistoryButton.setAttribute('type', "submit");
    searchHistoryButton.setAttribute('id', cityCount++)


    //create object to store data and push to array
    var citySearchData = {}
    citySearchData.city = citySearchInput.value;
    citySearchData.id = searchHistoryButton.id
    citySearchDataList.push(citySearchData)

    searchHistoryButton.innerHTML = citySearchData.city;
    searchHistoryEl.appendChild(searchHistoryButton);

    //run save cities function
    saveCities();

    console.log(citySearchData.city)

    coordinatesApiCall(citySearchData.city)

}


//loads cities search from local storage
var loadCities = function() {

    //get values from local storage
    var cities = JSON.parse(localStorage.getItem("cities"));
    
    if (!cities){
        return
    }

    //create object to store data and push to array
    var citySearchData = {}

    //loop through the local storage
    for (var i = 0; i < cities.length; i++) {
        

        //variable to hold city names from local storage
        var cityName = (cities[i].city)

        //variable to hold city id's from local storage
        var cityId = (cities[i].id)

        //create the list item/button and apply id and name from local storage
        var searchHistoryEl = document.createElement("li");
        searchHistoryList.appendChild(searchHistoryEl);
        var searchHistoryButton = document.createElement("button");
        searchHistoryButton.classList = 'btn mt-3 city-button';
        searchHistoryButton.setAttribute('type', "submit");
        searchHistoryButton.setAttribute('id', cityCount++);
        searchHistoryButton.innerHTML = cityName;
        searchHistoryEl.appendChild(searchHistoryButton);

    
        citySearchData.city = cityName
        citySearchData.id =  cityId
        citySearchDataList.push(citySearchData)
    }
}


//save search results to local storage
var saveCities = function(){
    //use cities as key and stringify our object holding our search information
    localStorage.setItem("cities", JSON.stringify(citySearchDataList));
}




var coordinatesApiCall = function (cityName) {

    //format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=9c87e085f289c9904bda474f03fe01ed";

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
                console.log(data)
                getCoordinates(data)
            })
        } else {
            alert("Error: City not Found")
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather")
    })
}

var getCoordinates = function(data){
    var lon = data.coord.lon
    var lat = data.coord.lat

    city.textContent="";
    city.textContent = data.name;

    getWeather(lon, lat)
}

//API call to OpenWeather One Call
var getWeather = function(lon, lat){

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&units=imperial&appid=9c87e085f289c9904bda474f03fe01ed"

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                displayCurrentWeather(data)
            })
        } else {
            alert("Error: City not found")
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather")
    })
}


//function to display current weather and forecast weather
var displayCurrentWeather = function (data) {
    //clear text content fields
    console.log(data)

    temp.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    uv.textContent = "";

    //assign text values from API
    icon.innerHTML = "<img src='http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png'>"
    temp.textContent = data.current.temp
    wind.textContent = data.current.wind_speed + " MPH";
    humidity.textContent = data.current.humidity + " %";
    
    //set uv index and change background color based on value
    uv.textContent = data.current.uvi
    if (data.current.uvi <= 1.0){
        uv.classList = "bg-success";
    } else if (data.current.uvi < 7){
        uv.classList = "bg-warning"
    } else {
        uv.classList = "bg-danger"
    }

    var forecastIcon = document.querySelectorAll(".five-day-icon");
    var forecastTemp = document.querySelectorAll(".five-day-temp");
    var forecastWind = document.querySelectorAll(".five-day-wind");
    var forecastHumidity = document.querySelectorAll(".five-day-humidity");
    
    for (var i = 0; i < forecastCards.length; i++){
        forecastTemp[i].textContent = data.daily[i].temp.day;
        forecastWind[i].textContent = data.daily[i].wind_speed + " MPH";
        forecastHumidity[i].textContent = data.daily[i].humidity + "%";
        forecastIcon[i].innerHTML = "<img src='http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png'>"
    }

    displayDates(data);
}

//function to display dates in current weather and forecast
var displayDates = function(data){
    //get unix date from API and convert 
    var unixTimestamp = data.current.dt
    var a = new Date(unixTimestamp * 1000);
    var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + "/" + date + "/" + year;

    document.getElementById("date").innerHTML = time
   
    var forecastDate = document.querySelectorAll(".five-day-date");

    for (var i = 0; i < forecastCards.length; i++){
        var unixTimestamp = data.daily[i].dt
        var a = new Date(unixTimestamp * 1000);
        var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + "/" + date + "/" + year;

        forecastDate[i].innerHTML = time
    }
}


//runs the create cities function
citySearchBtn.addEventListener("click", createCities)

//reloads previously searched weather information
document.addEventListener("click", function(e){
    if (e.target.classList == "btn mt-3 city-button"){
        var city = (e.target).textContent
        console.log((e.target).textContent)
        coordinatesApiCall(city)
    }
})

loadCities();