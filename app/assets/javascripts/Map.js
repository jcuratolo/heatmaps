console.log( "LOADED MAP.JS" );
var map,
  heatmap,
  myData,
  displayMode = 'Crime',
  maxCrime = 1,
  minCrime = 1,
  maxRent = 1,
  minRent = 1,
  localCrime = 1,
  localRent = 1,
  allRent = [],
  allCrime = [],
  hover,
  quickLookup = {},
  scatterData = [],
  testData2 = [],
  //colorHigh = [ 255, 24, 24 ],
  //colorLow = [ 8, 8, 72 ];
  colorHigh = [ 255, 112, 112 ],
  colorLow = [ 96, 112, 200 ];


// Get rent and crime from the our DB JSON endpoint
//var endpoint = "http://limitless-cliffs-3918.herokuapp.com/neighborhoods.json";
//myData = httpGet( endpoint );
myData = httpGet( "http://localhost:3000/neighborhoods.json" );
myData = JSON.parse( myData );


// Lock n load data! Loop through the parsed json
for ( i = 0; i < myData.length; i++ ) {
  if ( myData[ i ].AvgRentPrice > 0 ) {
    // Begin to accumulate all the rents in one place
    allRent.push( myData[ i ].AvgRentPrice );
  } else {
    console.log( "No rent for", myData[ i ].RegionName );
  }
  if ( myData[ i ].ViolentCrimePer10kCapita >= 0 ) {
    // Begin to accumulate all the crimerates in one place
    allCrime.push( myData[ i ].ViolentCrimePer10kCapita );
  } else {
    console.log( "No crime rate for", myData[ i ].RegionName );
  }
  // 2D array for google charts, with 3 columns
  scatterData.push(
    new Array(
      parseFloat( myData[ i ].AvgRentPrice ),
      parseFloat( myData[ i ].ViolentCrimePer10kCapita ),
      myData[ i ].RegionName + "\nAvg. Rent: " + myData[ i ].AvgRentPrice + "\n Crime per 10k: " + myData[ i ].ViolentCrimePer10kCapita ) 
    );
  // Begin building a so called hash for utility purposes
  quickLookup[ myData[ i ].RegionName ] = {
    rent: parseFloat( myData[ i ].AvgRentPrice ),
    crime: myData[ i ].ViolentCrimePer10kCapita
  };
}


// Find the highest and lowest rents crime rates
maxRent = Math.max.apply( null, allRent );
minRent = Math.min.apply( null, allRent );
maxCrime = Math.max.apply( null, allCrime );
minCrime = Math.min.apply( null, allCrime );


// Set up the map
function initialize() {
  console.log("initialize()");
  map = new google.maps.Map( document.getElementById( "map-canvas" ) );
  var mapCenter = new google.maps.LatLng( myData[ 0 ].Latitude, myData[ 0 ].Longitude );
  var mapOptions = {
    zoom: 12,
    scrollwheel: false,
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // Make it pretty and dark blue
    styles: [ {
      "featureType": "water",
      "stylers": [ {
        "color": "#021019"
      } ]
    }, {
      "featureType": "landscape",
      "stylers": [ {
        "color": "#08304b"
      } ]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [ {
        "color": "#0c4152"
      }, {
        "lightness": 5
      } ]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [ {
        "color": "#000000"
      } ]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [ {
        "color": "#0b434f"
      }, {
        "lightness": 25
      } ]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [ {
        "color": "#000000"
      } ]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [ {
        "color": "#0b3d51"
      }, {
        "lightness": 16
      } ]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [ {
        "color": "#000000"
      } ]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [ {
        "color": "#ffffff"
      } ]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [ {
        "color": "#000000"
      }, {
        "lightness": 13
      } ]
    }, {
      "featureType": "transit",
      "stylers": [ {
        "color": "#146474"
      } ]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [ {
        "color": "#000000"
      } ]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [ {
        "color": "#144b53"
      }, {
        "lightness": 14
      }, {
        "weight": 1.4
      } ]
    } ]
  };


  map.setOptions( mapOptions );


  // Pull geoJSON for the neighborhood polygons from the variable in zillow.js
  map.data.addGeoJson( myGJ );
  map.data.setStyle( {
    strokeWeight: 1,
    strokeColor: '#404040',
    //fillOpacity: .1
  } );


  // Make the map responsive to mouseovers and trigger appropriate changes
  map.data
    .addListener( 'mouseover', function( event ) {
      hover = event.feature.k.NAME;
      localCrime = quickLookup[ hover ].crime;
      localRent = quickLookup[ hover ].rent;
      featureVectorChartData.setValue( 0, 1, getCompositeScore( localCrime, localRent ) );
      featureVectorChartData.setValue( 1, 1, getSpecialScore( localCrime, localRent ) );
      barChartData.setValue( 1, 1, quickLookup[ hover ].crime / maxCrime );
      barChartData.setValue( 0, 1, quickLookup[ hover ].rent / maxRent )
      drawBarChart();
      drawFeatureVectorChart();
      // High light the mouse overed neighborhood
      map.data
        .overrideStyle( event.feature, {
          strokeWeight: 2,
          strokeColor: 'white',
          zIndex: 999
        } );
      // Update the display at the top of the screen
      document.getElementById( "readoutName" )
        .innerHTML = event.feature.getProperty( 'NAME' );

      document.getElementById( "readoutRent" )
        .innerHTML = "$" + quickLookup[ hover ].rent;

      document.getElementById( "readoutCrime" )
        .innerHTML = quickLookup[ hover ].crime + " Violent Crimes per 10k";
    } );
  
  // Make the map responsive to mouseouts
  map.data
    .addListener( 'mouseout', function( event ) {
      map.data
        .overrideStyle( event.feature, {
          strokeWeight: 1,
          strokeColor: '#404040',
          zIndex: 0
        } );
    } );
  
  // Recenter the map over the clicked neighborhood
  map.data.addListener( "click ", function( event ) {
    map.panTo( event.latLng );
  } );

  // Update the interface and begin coloring neighborhoods
  initDisplayMode()
} // End Initialize
//
//
//=============================================================================
//
//
// Utility functions used above
//
//
function initDisplayMode() {
  console.log("initDisplayMode()");
  document.getElementById( "displayMode" ).innerHTML = "Showing: "+displayMode;
  setNeighborhoodColors();
}


function interpolateToHex( scaleFactor ) {
  var intermediate = [];
  intermediate[ 0 ] = parseInt( Math.abs( ( colorHigh[ 0 ] - colorLow[ 0 ] ) * scaleFactor + colorLow[ 0 ] ) );
  intermediate[ 0 ] > 255 ? intermediate[ 0 ] = 255 : null;
  intermediate[ 1 ] = parseInt( Math.abs( ( colorHigh[ 1 ] - colorLow[ 1 ] ) * scaleFactor + colorLow[ 1 ] ) );
  intermediate[ 1 ] > 255 ? intermediate[ 1 ] = 255 : null;
  intermediate[ 2 ] = parseInt( Math.abs( ( colorHigh[ 2 ] - colorLow[ 2 ] ) * scaleFactor + colorLow[ 2 ] ) );
  intermediate[ 2 ] > 255 ? intermediate[ 2 ] = 255 : null;
  //console.log('#' + toHex(intermediate[0]) + toHex(intermediate[1]) + toHex(intermediate[2]));
  return '#' + toHex( intermediate[ 0 ] ) + toHex( intermediate[ 1 ] ) + toHex( intermediate[ 2 ] );
};


function toHex( c ) {
  var hex = c.toString( 16 )
    .slice( -2 );
  if ( hex.length == 1 ) {
    hex = '0' + hex;
  }
  return hex;
}


function httpGet( targetURL ) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", targetURL, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}


function recenter( newCenter ) {
  map.panTo( newCenter );
}


// Shows the current active displaymode on the navbar
function setDisplayMode( newDisplayMode ) {
  displayMode = newDisplayMode;
  document.getElementById( "displayMode" )
    .innerHTML = "Showing: "+displayMode;
  setNeighborhoodColors();
}


// Set all neighborhood polygon colors appropriately
function setNeighborhoodColors() {
  console.log("setNeighborhoodColors()");
  map.data.forEach( function( feature ) {
    // The name is the key in the quickLookup hash
    var key = feature.getProperty( 'NAME' );
    if ( quickLookup[ key ] ) {
      localCrime = quickLookup[ key ].crime;
      localRent = quickLookup[ key ].rent;
      map.data.overrideStyle( feature, {
        fillColor: getFillColor( displayMode ),        
        fillOpacity: .7
      } );
    } else {
      map.data.remove( feature );
      console.log("removed feature ", feature.getProperty('NAME'));
    }
  } );
}// End setNeighborhoodColors


// Get the correctly interpolated color for the neighborhood poly
function getFillColor( currentDisplayMode ) {
  // var selectableDisplayModes = {
  //   'Crime':     interpolateToHex( localCrime / maxCrime ),
  //   'Rent':      interpolateToHex( localRent / maxRent ),
  //   'Composite': interpolateToHex( getCompositeScore( localCrime, localRent ) ),
  //   'Special':   interpolateToHex( getSpecialScore( localCrime, localRent ) )
  // };
  // return selectableDisplayModes[ currentDisplayMode ];

  switch ( currentDisplayMode ) {
    case 'Crime':
      return interpolateToHex( localCrime / maxCrime );
    case 'Rent':
    console.log(localRent / maxRent);
      return interpolateToHex( localRent / maxRent );
    case 'Composite':
    console.log(getCompositeScore( localCrime, localRent ) );
      return interpolateToHex( getCompositeScore( localCrime, localRent ) );
    case 'Special':
      return interpolateToHex( getSpecialScore( localCrime, localRent ) );
  }
}


// Calculate the composite score
function getCompositeScore() {
  localCrimeNormalized = localCrime / maxCrime;
  localRentNormalized = localRent / maxRent;
  return Math.pow( localCrimeNormalized * localCrimeNormalized + 
    localRentNormalized * localRentNormalized, .5 );
}


// Calculate the special score
function getSpecialScore( feat1, feat2 ) {
  var medianRent, medianCrime;
  medianRent = allRent.sort( function( a, b ){ return b-a })[ allRent.length / 2 ];
  medianCrime = allCrime.sort(function( a, b ){ return b-a })[ allCrime.length / 2 ];
  var medianVector = Math.pow(medianRent * medianRent + medianCrime * medianCrime,.5)
  var localVector = Math.pow(Math.pow(localCrime,4.2)  + localRent * localRent,.5);
  var maxVector = Math.pow(maxCrime * maxCrime + maxRent * maxRent,.5);
  var result = Math.abs( (medianVector - localVector) / (medianVector - maxVector) );
  //console.log(result);
  return result;
}

// Call initialize as soon as the window finishes loading
google.maps.event.addDomListener( window, 'load', initialize );