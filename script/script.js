$(document).ready(function() {
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dt = new Date();

        
    $(".currentDay").text(weekdays[dt.getDay()]);
    $(".currentDate").text(`${dt.getMonth() + 1} / ${dt.getDate()} / ${dt.getFullYear()}`);
    $(".wday1").text(weekdays[dt.getDay()+1]);
    $(".day1").text(`${dt.getMonth() + 1} / ${dt.getDate() + 1} / ${dt.getFullYear()}`);
    $(".wday2").text(weekdays[dt.getDay()+2]);
    $(".day2").text(`${dt.getMonth() + 1} / ${dt.getDate() + 2} / ${dt.getFullYear()}`);
    $(".wday3").text(weekdays[dt.getDay()+3]);
    $(".day3").text(`${dt.getMonth() + 1} / ${dt.getDate() + 3} / ${dt.getFullYear()}`);
    $(".wday4").text(weekdays[dt.getDay()+4]);
    $(".day4").text(`${dt.getMonth() + 1} / ${dt.getDate() + 4} / ${dt.getFullYear()}`);
    $(".wday5").text(weekdays[dt.getDay()+5]);
    $(".day5").text(`${dt.getMonth() + 1} / ${dt.getDate() + 5} / ${dt.getFullYear()}`);

    let cityEl = $("<a>");
    let storedCity = "";

    function convertTemp(tempK){
        //Convert temp Kelvin to Fahrenheit
        let tempF = (tempK - 273.15) * 1.80 + 32;
        return tempF
    }
    
    function callAPI(city){
        // OpenWeatherMap API key and URL query
        var APIKey = "cb77ba3879d59e814a56609394606986";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + APIKey;

        // Ajax call API city
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
    
            // Get latitude and longitude of searched city
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
    
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=hourly,minutely&appid=" + APIKey;
    
            // Ajax call Openweather API latitude and longitude
           $.ajax({
               url: queryURL2,
               method: "GET"
           }).then(function(response2) {
               
               // Transfer current weather content to current forecast HTML
               $(".city").text(city.charAt(0).toUpperCase()+city.slice(1));
               $(".icon").attr("src","http://openweathermap.org/img/wn/"+response2.current.weather[0].icon+"@2x.png")
               let currentTempF = convertTemp(response2.current.temp);
               $(".tempF").text("Temperature: " + currentTempF.toFixed(0) + String.fromCharCode(176) + " F");
               $(".humidity").text("Humidity: " + response2.current.humidity + "%");
               $(".wind").text("Wind Speed: " + response2.current.wind_speed + " m/s");
               let uvi = response2.current.uvi;

               if(uvi<=2){
                   // UV index less than equal to 2 favorable, green
                   $(".uvIndex").attr("class","uvIndex rounded px-2 bg-success");
                   $(".uvIndex").text("UV Index: " + uvi + " Favorable");
               } else if(uvi>2 && uvi<=7){
                   // UV index less between 2 and 7 moderate, yellow
                   $(".uvIndex").attr("class","uvIndex rounded px-2 bg-warning");
                   $(".uvIndex").text("UV Index: " + uvi + " Moderate");
               } else{
                   // UV index greater than 7 severe, red
                   $(".uvIndex").attr("class","uvIndex rounded px-2 bg-danger");
                   $(".uvIndex").text("UV Index: " + uvi + " Severe");
               }
    
               // Transfer daily content to five day forecast HTML
               for (let i = 1; i < 6; i++) {
                   let maxTemp = convertTemp(response2.daily[i].temp.max);
                   let minTemp = convertTemp(response2.daily[i].temp.min);
                   $(".maxDay" + i).text("High: " + maxTemp.toFixed(0) + String.fromCharCode(176) + " F");
                   $(".minDay" + i).text("Low: " + minTemp.toFixed(0) + String.fromCharCode(176) + " F");
                   $(".humDay" + i).text("Humidity: " + response2.daily[i].humidity + "%");
                   $(".weatherIcon" + i).attr("src","http://openweathermap.org/img/wn/"+response2.daily[i].weather[0].icon+"@2x.png")
                }
               });
        });
    }

    $(".searchBtn").click(function(){
        // Search button click, get search input value and call API
        cityInput = $(".city-input").val();
        callAPI(cityInput);
        // Add searched city to cities list
        let cityEl = $("<a>");
        cityEl.text(cityInput.charAt(0).toUpperCase()+cityInput.slice(1));
        cityEl.attr("class","list-group-item list-group-item-action");
        $(".cityList").prepend(cityEl);
        // Add searched city to localStorage
        localStorage.setItem("searchedCity",cityInput.charAt(0).toUpperCase()+cityInput.slice(1));
    })

    $(document.body).on("click", "a", function(){
        // City list element click, get list element city and call API
        cityClick = $(this).text();
        callAPI(cityClick);
        // Add clicked city to localStorage element
        localStorage.setItem("searchedCity",cityClick);
    })

    if(!localStorage.getItem("searchedCity")){
        localStorage.setItem("searchedCity","New York");
        storedCity = localStorage.getItem("searchedCity");
        callAPI(storedCity);
        // Add New York to cities list
        cityEl.text(storedCity);
        cityEl.attr("class","list-group-item list-group-item-action");
        $(".cityList").prepend(cityEl);
    } else{
        storedCity = localStorage.getItem("searchedCity");
        callAPI(storedCity);
        // Add stored city to cities list
        cityEl.text(storedCity);
        cityEl.attr("class","list-group-item list-group-item-action");
        $(".cityList").prepend(cityEl);
    }
})