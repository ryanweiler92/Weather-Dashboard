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

}



var loadCities = function() {

    var cities = JSON.parse(localStorage.getItem("cities"));

    console.log(cities)
    

    for (var i = 0; i < cities.length; i++) {
        console.log(cities[i].city)
        console.log(cities[i].id)

        var cityName = (cities[i].city)

        var cityId = (cities[i].id)

        var searchHistoryEl = document.createElement("li");
        searchHistoryList.appendChild(searchHistoryEl);

        var searchHistoryButton = document.createElement("button");
        searchHistoryButton.classList = 'btn mt-3 city-button';
        searchHistoryButton.setAttribute('type', "submit");
        searchHistoryButton.setAttribute('id', cityId )

        searchHistoryButton.innerHTML = cityName;
        searchHistoryEl.appendChild(searchHistoryButton);
    }
}



//save search results to local storage

var saveCities = function(){

    localStorage.setItem("cities", JSON.stringify(citySearchDataList));
}




//get city from search input
citySearchBtn.addEventListener("click", createCities)


// var saveCities = function(){
//     for (var i = 0; i <citySearchDataList.length; i++) {
        
//         var cityIds = citySearchDataList[i].id;

//         var cityName = citySearchDataList[i].city

//         localStorage.setItem(cityIds, cityName)
//     }
// }

loadCities();