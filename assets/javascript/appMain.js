$(document).ready(function () {

  $('.sidenav').sidenav({ edge: "right" });
  $('.collapsible').collapsible();

});

var APIKey = "960c350c2b7e51ffc0106d9d13519dd4";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" +
      "q=West Allis,US&units=imperial&appid=" + APIKey;

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {

    console.log(response)
 
   


    console.log(moment.unix(response.list[0].dt).format("ddd"));
    $("#day1").text(moment.unix(response.list[0].dt).format("ddd"));
    $("#day2").text(moment.unix(response.list[9].dt).format("ddd"));
    $("#day3").text(moment.unix(response.list[15].dt).format("ddd"));

  
    $("#icon1").attr("src","http://openweathermap.org/img/w/"+response.list[0].weather[0].icon+".png");
    $("#icon2").attr("src","http://openweathermap.org/img/w/"+response.list[9].weather[0].icon+".png");
    $("#icon3").attr("src","http://openweathermap.org/img/w/"+response.list[15].weather[0].icon+".png");
   
    let min1 = response.list[0].main.temp_min;
    console.log(Math.round(min1));
   
    $("#minmax1").text(Math.round((response.list[0].main.temp_min))+"/"+Math.round(response.list[0].main.temp_max));
    $("#minmax2").text(Math.round(response.list[9].main.temp_min)+"/"+Math.round(response.list[0].main.temp_max));
    $("#minmax3").text(Math.round(response.list[15].main.temp_min)+"/"+Math.round(response.list[0].main.temp_max));
    // $("#temp1").text("5 day forecast:" +" "+response.list[38].weather[0].main);


});
