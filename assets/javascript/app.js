


$(document).ready(function () {

    $(".dropdown-trigger").dropdown({
        hover: true,
        coverTrigger: false,
        alignment: "right"
    }

    );


    $('.sidenav').sidenav({ edge: "right" });

    $('.collapsible').collapsible();
    $('.scrollspy').scrollSpy();
    $('.carousel').carousel();
});

$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
});

// var queryURL = "https://api.darksky.net/forecast/ff90c15ee107e6af9a09c30afdd4bf1c/37.8267,-122.4233";
  
var APIKey = "960c350c2b7e51ffc0106d9d13519dd4";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {

    console.log(response)


});

