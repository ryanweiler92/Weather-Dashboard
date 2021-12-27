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

//get city from search input
citySearchBtn.addEventListener("click", function(e) {
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

})


var loadCities = function() {


    for (var i = 0; i <localStorage.length; i++){

        
        //variable to retrieve the value of each key in local storage
       var getCity = localStorage.getItem(localStorage.key[i])

       console.log(localStorage.key[i])


        var searchHistoryEl = document.createElement("li");
        searchHistoryList.appendChild(searchHistoryEl);

        var searchHistoryButton = document.createElement("button");
        searchHistoryButton.classList = 'btn mt-3 city-button';
        searchHistoryButton.setAttribute('type', "submit");
        searchHistoryButton.setAttribute('id', localStorage.key)

        searchHistoryButton.innerHTML = getCity;
        searchHistoryEl.appendChild(searchHistoryButton);
    }
}



//save search results to local storage
var saveCities = function(){
    for (var i = 0; i <citySearchDataList.length; i++) {
        
        var cityIds = citySearchDataList[i].id;

        var cityName = citySearchDataList[i].city

        localStorage.setItem(cityIds, cityName)
    }
}

loadCities();