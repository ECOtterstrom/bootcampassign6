$(document).ready(function(){
  //Creating the table
  // tr = $('<tr>');
  // searchCol = $('<td>');
  // weatherCol = $('<td>');
  // searchBox = $(`<textarea id=citySearch class = "input" rows="2" cols="20">`)
  
    function currentDate() {
      let date = moment().format("dddd, MMMM Do YYYY");
      $('#currentDay').append(date); 
     }
    //currentDate();

    // First API key variable
    var APIKey1 = "397e528f419d411919453c9941235a39";
    // Building the URL we need to query the weather database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Denver&appid=" + APIKey1 + "&units=imperial";

    //AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // Store the retrieved data inside an object called "response"
      .then(function(response) {
        tr = $('#tr');
        city = $('<td>');
        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $("<.city>").text("City: " + response.name);
        $("<.date>").text("Date: " + currentDate());
        $("<.temp>").text("Temperature: " + response.main.temp);
        $("<.humidity>").text("Humidity: " + response.main.humidity);
        $("<.windSpeed>").text("Wind Speed: " + response.wind.speed);
        $("<.icon>").text("Icon: " + response.weather.icon);
        tr.append("City: " + response.name,
          "<br>", "Date: " + currentDate(), 
          "<br>", "Temperature: " + response.main.temp, 
          "<br>", "Humidity: " + response.main.humidity,
          "<br>", "Wind Speed: " + response.wind.speed);
        // $(".col-sm-9").append(tr);
        // $("#dashboard").append(".col-sm-9");

        // Log the data in the console
        console.log("City: " + response.name);
        console.log("Date: " + response.date);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature: " + response.main.temp);
        console.log("Icon: " + response.weather.icon)
      });

    // Second API Key
    var APIKey2 = "25eae694827e9cccc433d37950486b7c";
    // Building the URL we need to query the forecast database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
      "q=Denver&appid=" + APIKey2 + "&units=imperial";

    // AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // Store the retrieved data inside an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $("<.city>").text("City: " + response.city.name);
        $("<.date>").text("Date: " + response.list[4].dt_txt);
        $("<.humidity1>").text("Humidity1: " + response.list[4].main.humidity);
        $("<.humidity2>").text("Humidity2: " + response.list[12].main.humidity);
        $("<.humidity3>").text("Humidity3: " + response.list[20].main.humidity);
        $("<.humidity4>").text("Humidity4: " + response.list[28].main.humidity);
        $("<.humidity5>").text("Humidity5: " + response.list[36].main.humidity);
        $("<.temp>").text("Temperature: " + response.list[4].main.temp);
        $("<.icon>").text("Icon: " + response.list[4].weather[0].icon);
        
        // Log the data in the console
        console.log("City: " + response.city.name);
        console.log("Date: " + response.list[4].dt_txt);
        console.log("Humidity1: " + response.list[4].main.humidity);
        console.log("Humidity2: " + response.list[12].main.humidity);
        console.log("Humidity3: " + response.list[20].main.humidity);
        console.log("Humidity4: " + response.list[28].main.humidity);
        console.log("Humidity5: " + response.list[36].main.humidity);
        console.log("Temperature: " + response.list[4].main.temp);
        console.log("Icon: " + response.list[4].weather[0].icon);
      });
});