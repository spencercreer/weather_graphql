$(document).ready(function() {
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
    
            // Log the queryURL
            console.log(queryURL);
    
            // Log the resulting object
            console.log(response);
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
    
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&exclude=hourly,minutely&appid=" + APIKey;
    
            // Ajax call Openweather API latitude and longitude
           $.ajax({
               url: queryURL2,
               method: "GET"
           }).then(function(response2) {
               console.log(response2);
               // Transfer current weather content to current forecast HTML
               $(".city").text(city);
               let currentTempF = convertTemp(response2.current.temp);
               $(".tempF").text("Temperature: " + currentTempF.toFixed(2) + String.fromCharCode(176) + " F");
               $(".humidity").text("Humidity: " + response2.current.humidity + "%");
               $(".wind").text("Wind Speed: " + response2.current.wind_speed + " m/s");
               $(".uvIndex").text("UV Index: " + response2.current.uvi);
    
               // Transfer daily content to five day forecast HTML
               for (let i = 1; i < 6; i++) {
                   let maxTemp = convertTemp(response2.daily[i].temp.max);
                   let minTemp = convertTemp(response2.daily[i].temp.min);
                   $(".maxDay" + i).text("Temperature High: " + maxTemp.toFixed(2) + String.fromCharCode(176) + " F");
                   $(".minDay" + i).text("Temperature Low: " + minTemp.toFixed(2) + String.fromCharCode(176) + " F");
                   $(".humDay" + i).text("Humidity: " + response2.daily[i].humidity + "%");
                }
               });
        });
    }

    $(".searchBtn").click(function(){
        cityInput = $(".city-input").val();
        callAPI(cityInput);
        cityEl = $("<a>");
        cityEl.text(cityInput);
        cityEl.attr("class","list-group-item list-group-item-action");
        $(".cityList").prepend(cityEl);
    })

    callAPI("New York")  
})