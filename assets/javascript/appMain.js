// $(document).ready(function () {

//   $('.sidenav').sidenav({ edge: "right" });
//   $('.collapsible').collapsible();
  

// });

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
    $("#day2").text(moment.unix(response.list[7].dt).format("ddd"));
    $("#day3").text(moment.unix(response.list[15].dt).format("ddd"));

  
    $("#icon1").attr("src","http://openweathermap.org/img/w/"+response.list[0].weather[0].icon+".png");
    $("#icon2").attr("src","http://openweathermap.org/img/w/"+response.list[9].weather[0].icon+".png");
    $("#icon3").attr("src","http://openweathermap.org/img/w/"+response.list[17].weather[0].icon+".png");
   
    let min1 = response.list[0].main.temp_min;
    console.log(Math.round(min1));
   
    $("#minmax1").text(Math.round((response.list[0].main.temp_min))+"/"+Math.round(response.list[0].main.temp_max));
    $("#minmax2").text(Math.round(response.list[9].main.temp_min)+"/"+Math.round(response.list[0].main.temp_max));
    $("#minmax3").text(Math.round(response.list[17].main.temp_min)+"/"+Math.round(response.list[0].main.temp_max));
    // $("#temp1").text("5 day forecast:" +" "+response.list[38].weather[0].main);


});

//Materialize JS Items:

$(document).ready(function () {
  $('.sidenav').sidenav({ edge: "right" });
  $('.collapsible').collapsible();
  $('.tooltipped').tooltip();

    $('.carousel-slider').carousel({
      // fullWidth: true,
      duration: 200,
    });
      autoplay()  
    
    $('.materialboxed').materialbox();
  });
  let wait = false;

  function autoplay() {
    if (wait===false){
      $('.carousel').carousel('next');
      setTimeout(autoplay, 8000);
    }
  }

  //EXTRA: sets up a pause for carousel on mouse hover
  $(".carousel").hover(function(){wait = true;
  console.log("IN")},function(){wait=false;console.log("OUT");autoplay()});

  //adds Google map to div
  function initMap() {
  
    //create div for map - the css for #map is really important
    let gameLocation = { lat: 43.01248, lng: -88.033669 };
    let parkingLocation = { lat: 43.011426, lng: -88.033097 };
    let parkingIcon = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
  
    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    let gameIcon = './assets/images/34B4B704-marker.png';

    if (document.location.href.indexOf("index.html")===-1){
      gameIcon= '../images/34B4B704-marker.png';
      console.log(gameIcon);
   }
  
  
    //center map at game location
    let map = new google.maps.Map(document.getElementById('map'), { zoom: 15, center: gameLocation });
    //maker at game location
    let marker = new google.maps.Marker({ position: gameLocation, icon: gameIcon, map: map, animation: google.maps.Animation.DROP, title: 'Game Location' });
    let parkingMarker = new google.maps.Marker({ position: parkingLocation, icon: parkingIcon, map: map, animation: google.maps.Animation.DROP, title: 'Parking Lot' });
  
  
    // Define the LatLng coordinates for the polygon's path.
    let parkingPolygon = [
      { lat: 43.011496, lng: -88.032262 },
      { lat: 43.011306, lng: -88.032272 },
      { lat: 43.011316, lng: -88.033950 },
      { lat: 43.011499, lng: -88.033950 }
    ];
    let fieldPolygon = [
      { lat: 43.012769, lng: -88.033212 },
      { lat: 43.011726, lng: -88.033208 },
      { lat: 43.011726, lng: -88.034050 },
      { lat: 43.011885, lng: -88.034064 },
      { lat: 43.011890, lng: -88.034774 },
      { lat: 43.012767, lng: -88.034772 },
      { lat: 43.012769, lng: -88.033212 }
    ];
  
    // Construct the polygon.
    let fieldBoundary = new google.maps.Polygon({
      paths: fieldPolygon,
      strokeColor: '#1976D2',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#1976D2',
      fillOpacity: 0.35
    });
  
    // Construct the polygon.
    let parkingBoundary = new google.maps.Polygon({
      paths: parkingPolygon,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
  
    //add polygons to map
    parkingBoundary.setMap(map);
    fieldBoundary.setMap(map);
  
    //sets up all the direction buttons
    new AutocompleteDirectionsHandler(map)
  
    //adds a listener to the recenter button
    recenter.addEventListener('click', function () {
      map.setCenter(gameLocation)
    });
  }

  //autocomplete constructor from Google documentation
  function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
  
    //***customize the input location and div for this
    let directionInput = document.getElementById('search-directions');
    let originInput = document.getElementById('origin-input');
    let reCenter = document.getElementById('recenter');
  
  
  
    //***try to do this as icons instead of radio buttons
    let modeSelector = document.getElementById('mode-selector');
  
    ///sets directon services to draw the line
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);
  
    //outputs the directions to antoehr empty div ala Google names
    this.directionsDisplay.setPanel(document.getElementById('direction-display'));
  
    //sets listener on map button
    $("#map-modal-button").on("click", function(){
      $("#map-modal").modal();   
      google.maps.event.trigger(map, "resize");
    });
    
    //sets listener on directions button and only activates the modal if it has content
    $("#direction-input").on('click', function () {
      if ($('#direction-display').children().length > 0) {
        $('#direction-modal').modal();
      }
    });
  
    //***This looks like the Autocompelete call to google */
    let originAutocomplete = new google.maps.places.Autocomplete(
      originInput, { placeIdOnly: true });
  
  
    //***listeners for transpoation mode */
    this.setupClickListener('changemode-walking', 'WALKING');
    this.setupClickListener('changemode-transit', 'TRANSIT');
    this.setupClickListener('changemode-driving', 'DRIVING');
  
    //***lsteners for start postition */
    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    // this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
  
    //***Sets up where to add buttons and controls around the map with google formats */
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(directionInput);
    this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(modeSelector);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(reCenter);
  }
  
  // Sets a listener on a mode button to change the filter type on Places
  // Autocomplete.
  AutocompleteDirectionsHandler.prototype.setupClickListener = function (id, mode) {
    let modeButton = document.getElementById(id);
    var me = this;
    modeButton.addEventListener('click', function () {
      me.travelMode = mode;
      me.route();
    });
  };
  
  //***Reads like its the event listener for the start and end but not sure */
  AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
    let me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function () {
      let place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }
      if (mode === 'ORIG') {
        me.originPlaceId = place.place_id;
      }
      me.route();
    });
  
  };
  
  //***This is the bit that draws the line! */
  AutocompleteDirectionsHandler.prototype.route = function () {
    if (!this.originPlaceId) {
      return;
    }
    let me = this;
  
    this.directionsService.route({
      origin: { 'placeId': this.originPlaceId },
      destination: { 'placeId': "EikxNzAwIFMgOTZ0aCBTdCwgV2VzdCBBbGxpcywgV0kgNTMyMTQsIFVTQSIbEhkKFAoSCQt8opJnBQWIEVgvMm-bK-JNEKQN" },
      //   destination: {lat: 43.011496, lng: -88.033907},
      travelMode: this.travelMode
    }, function (response, status) {
      if (status === 'OK') {
        me.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  
  };


  
  
  
  
  
  
  
  
  