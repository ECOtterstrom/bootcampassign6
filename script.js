 var APIKey1 = "397e528f419d411919453c9941235a39";
 var APIKey2 = "25eae694827e9cccc433d37950486b7c";

 var cityList = JSON.parse(window.localStorage.getItem("cityList")) || [];
$(document).ready(function(){
  
      let date = moment().format("dddd, MMMM Do YYYY");
      $('#currentDay').append(date); 

      loadHistoryList(cityList);
      getCurrentWeather(cityList[cityList.length - 1]);

      $("#history").on("click", "li", function() {
            getCurrentWeather($(this).text());
          });
            
// This function handles events where the Search button is clicked
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var cityInput = $("#cityInput").val();
  $("#cityInput").val('');
  getCurrentWeather(cityInput);
  addCityToLocaltorage(cityInput);

});

});

function loadHistoryList(){
      for (var i = 0; i < cityList.length; i++) {
            createHistoryLi(cityList[i]);
          }
}

function addCityToLocaltorage(cityInput){

      if (cityList.indexOf(cityInput) === -1) {
            cityList.push(cityInput);
            window.localStorage.setItem("cityList", JSON.stringify(cityList));
      
            createHistoryLi(cityInput);
          }


}

function createHistoryLi(cityInput){
      var li = $("<li>").addClass("list-group-item list-group-item-action").text(cityInput);
      $("#history").append(li);
}


function getCurrentWeather(cityInput){
   //URL to API
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIKey1 + "&units=imperial";
  
   // Creating an AJAX call for the specific movie button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(data) {
 
         // create html content for current weather
         var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");

         var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
         var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
         var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");

         var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    
         title.append(img);
        
         getUVIndex(data.coord.lat, data.coord.lon, title, temp, humid, wind);
         getForecast(cityInput)
 
   });
}



function getUVIndex(lat, lon, title, temp, humid, wind){
      //URL to API
      var queryURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey1}&lat=${lat}&lon=${lon}`;
     
      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {
            console.log(data)

            var uv = $("<p>").text("UV Index: ");
            var btn = $("<span>").addClass("btn btn-sm").text(data.value);
            
            if (data.value < 3) {
              btn.addClass("btn-success");
            }
            else if (data.value < 7) {
              btn.addClass("btn-warning");
            }
            else {
              btn.addClass("btn-danger");
            }

            uv.append(btn)

            $('#currentWeather').empty().append(title, temp, humid, wind, uv);

    
      });
   }

   
function getForecast(cityInput){
      //URL to API
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + APIKey1 + "&units=imperial";
     
      // Creating an AJAX call for the specific movie button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(data) {
            console.log(data)
            $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");

            for(var i = 0; i < data.list.length; i++){
                  if(data.list[i].dt_txt.indexOf("15:00:00") !== -1){
                   var col = $("<div>").addClass("col-md-2");
                   var card = $("<div>").addClass("card bg-primary text-white");
                   var body = $("<div>").addClass("card-body");
                   var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
                   var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                   var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                   var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                   col.append(card.append(body.append(title, img, p1, p2)));
                   $("#forecast .row").append(col);
                  }
            }
    
      });
   }


      // Weather
      //   $("<.city>").text("City: " + response.name);
      //   $("<.date>").text("Date: " + date);
      //   $("<.temp>").text("Temperature: " + response.main.temp);
      //   $("<.humidity>").text("Humidity: " + response.main.humidity);
      //   $("<.windSpeed>").text("Wind Speed: " + response.wind.speed);
      //   $("<.icon>").text("Icon: " + response.weather.icon);

      // Forecast
      //   $("<.city>").text("City: " + response.city.name);
      //   $("<.date>").text("Date: " + response.list[4].dt_txt);
      //   $("<.humidity1>").text("Humidity1: " + response.list[4].main.humidity);
      //   $("<.humidity2>").text("Humidity2: " + response.list[12].main.humidity);
      //   $("<.humidity3>").text("Humidity3: " + response.list[20].main.humidity);
      //   $("<.humidity4>").text("Humidity4: " + response.list[28].main.humidity);
      //   $("<.humidity5>").text("Humidity5: " + response.list[36].main.humidity);
      //   $("<.temp>").text("Temperature: " + response.list[4].main.temp);
      //   $("<.icon>").text("Icon: " + response.list[4].weather[0].icon);
