//input form element for city search
var citySearchInput = document.getElementById("city-search");
//submit button element for city search
var citySearchBtn = document.getElementById("search-btn")
//unorder list element for city search history
var searchHistoryList = document.getElementById("search-history");


//get city from search input
citySearchBtn.addEventListener("click", function(e) {
    e.preventDefault();

    var citySearchData = {
        city: citySearchInput.value,
    };

    console.log('submitting form:', citySearchData);

    
})