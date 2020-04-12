$(document).ready(function(){
  //Creating the table
  // tr = $('<tr>');
  // searchCol = $('<td>');
  // weatherCol = $('<td>');
  // searchBox = $(`<textarea id=citySearch class = "input" rows="2" cols="20">`)

/* <div class="city"></div>
  <div class="wind"></div>
  <div class="humidity"></div>
  <div class="temp"></div>
  <div class="icon"></div>
  <div class="tempF"></div> */

    // This is our API key
    var APIKey = "25eae694827e9cccc433d37950486b7c";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
      "q=Denver&appid=" + APIKey + "&units=imperial";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html("<h1>" + response.city.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.list[4].main.humidity);
        $(".humidity").text("Humidity: " + response.list[12].main.humidity);
        $(".humidity").text("Humidity: " + response.list[20].main.humidity);
        $(".humidity").text("Humidity: " + response.list[28].main.humidity);
        $(".humidity").text("Humidity: " + response.list[36].main.humidity);
        $(".temp").text("Temperature: " + response.list[4].main.temp);
        $(".icon").text("Icon: " + response.list[4].weather[0].icon);
        // // Convert the temp to fahrenheit
        // var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // // add temp content to html
        // $(".temp").text("Temperature (K) " + response.main.temp);
        // $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        console.log("City: " + response.city.name);
        console.log("Humidity1: " + response.list[4].main.humidity);
        console.log("Humidity2: " + response.list[12].main.humidity);
        console.log("Humidity3: " + response.list[20].main.humidity);
        console.log("Humidity4: " + response.list[28].main.humidity);
        console.log("Humidity5: " + response.list[36].main.humidity);
        console.log("Temperature: " + response.list[4].main.temp);
        console.log("Icon: " + response.list[4].weather[0].icon)
        // console.log("Temperature (F): " + tempF);
      });
});