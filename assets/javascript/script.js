//input form element for city search
var citySearchInput = document.getElementById("city-search");
//submit button element for city search
var citySearchBtn = document.getElementById("search-btn")
//unorder list element for city search history
var searchHistoryList = document.getElementById("search-history");

//empty object
var citySearchDataList = []

//variable to assign id's to each city search history
var cityCount = 0



var createCities = function(e){
    
    //prevents page from refreshing
    e.preventDefault();

    console.log('submitting form:', citySearchDataList);

    //create li element
    var searchHistoryEl = document.createElement("li");
    searchHistoryList.appendChild(searchHistoryEl);

     
    //create button element with city value
    var searchHistoryButton = document.createElement("button");
    searchHistoryButton.classList = 'btn mt-3 city-button';
    searchHistoryButton.setAttribute('type', "submit");
    searchHistoryButton.setAttribute('id', cityCount ++)


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

    getCurrentWeather(citySearchData.city)

}



var loadCities = function() {

    //get values from local storage
    var cities = JSON.parse(localStorage.getItem("cities"));
    
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
        searchHistoryButton.setAttribute('id', cityId);
        searchHistoryButton.innerHTML = cityName;
        searchHistoryEl.appendChild(searchHistoryButton);
    }
}


//save search results to local storage
var saveCities = function(){
    //use cities as key and stringify our object holding our search information
    localStorage.setItem("cities", JSON.stringify(citySearchDataList));
}



var getCurrentWeather = function (cityName) {

    //format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=9c87e085f289c9904bda474f03fe01ed";

    console.log(apiUrl)


    //make a request to the url
    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
                console.log(data)
            })
        }
    })


}






//runs the create cities function
citySearchBtn.addEventListener("click", createCities)


loadCities();