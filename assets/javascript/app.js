let mapDiv = $("<div>").attr("id","map");
$("body").append(mapDiv);


function initMap() {
    //create div for map - the css for #map is really important
    let gameLocation = {lat: 43.01248, lng: -88.033669};
    let parkingLocation = {lat: 43.011426, lng: -88.033097};
    var parkingIcon = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';

      // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var gameIcon= './assets/images/34B4B704-marker.png';

  
    //center map at game location
    let map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: gameLocation});
    //maker at game location
    let marker = new google.maps.Marker({position: gameLocation, icon: gameIcon, map: map, animation: google.maps.Animation.DROP,title: 'Game Location'});
    let parkingMarker = new google.maps.Marker({position: parkingLocation, icon: parkingIcon, map: map, animation: google.maps.Animation.DROP,title: 'Parking Lot'});
   
    
    // Define the LatLng coordinates for the polygon's path.
    let parkingPolygon = [
        {lat: 43.011496, lng: -88.032262},
        {lat: 43.011306, lng: -88.032272},
        {lat: 43.011316, lng: -88.033950},
        {lat: 43.011499, lng: -88.033950}
    ];
    let fieldPolygon =[
        {lat: 43.012769, lng: -88.033212},
        {lat: 43.011726, lng: -88.033208},
        {lat: 43.011726, lng: -88.034050},
        {lat: 43.011885, lng: -88.034064},
        {lat: 43.011890, lng: -88.034774},
        {lat: 43.012767, lng: -88.034772},
        {lat: 43.012769, lng: -88.033212}
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
    parkingBoundary.setMap(map);
    fieldBoundary.setMap(map);
    new AutocompleteDirectionsHandler(map)
    }
   

    //autocomplete constructor from Google documentation
    function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';

        //***customize the input location and div for this
        var originInput = document.getElementById('origin-input');


        //***try to do this as icons instead of radio buttons
        var modeSelector = document.getElementById('mode-selector');

        ///sets directon services to draw the line
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        //outputs the directions to antoehr empty div ala Google names
        this.directionsDisplay.setPanel(document.getElementById('right-panel'));

        //***This looks like the Autocompelete call to google */
        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, {placeIdOnly: true});


        //***listeners for transpoation mode */
        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');

        //***lsteners for start postition */
        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        // this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        //***Not sure what thsi does! */
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(originInput);
          this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(modeSelector);
      }

            // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
        var radioButton = document.getElementById(id);
        var me = this;
        radioButton.addEventListener('click', function() {
          me.travelMode = mode;
          me.route();
        });
      };

      //***Reads like its the event listener for the start and end but not sure */
      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
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
      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId ) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': "EikxNzAwIFMgOTZ0aCBTdCwgV2VzdCBBbGxpcywgV0kgNTMyMTQsIFVTQSIbEhkKFAoSCQt8opJnBQWIEVgvMm-bK-JNEKQN"},
        //   destination: {lat: 43.011496, lng: -88.033907},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };





  
 
 

