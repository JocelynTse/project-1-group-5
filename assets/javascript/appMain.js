
//Materialize JS Items:
$(document).ready(function () {
    $('.tooltipped').tooltip();
    $('.carousel-slider').carousel({
      fullWidth: true,
      duration: 200,
    });
    autoplay()   
  });
  
  function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 8000);
  }
  
  //adds Google map to div
  function initMap() {
  
    //create div for map - the css for #map is really important
    let gameLocation = { lat: 43.01248, lng: -88.033669 };
    let parkingLocation = { lat: 43.011426, lng: -88.033097 };
    let parkingIcon = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
  
    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    let gameIcon = './assets/images/34B4B704-marker.png';
  
  
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
  
    //sets listener on directions button and only activates the modal if it has content
    $("#direction-input").on('click', function () {
      if ($('#direction-display').children().length > 0) {
        $('.modal').modal();
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
  
  
  
  
  
  
  
  
  
  