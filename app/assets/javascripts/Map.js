console.log( "LOADED MAP.JS" );
var map,
  heatmap,
  myData,
  displayMode = 'crime',
  maxCrime,
  minCrime,
  maxRent,
  minRent,
  hover,
  quickLookup = {},
  localCrime,
  localRent,
  allRent = [],
  allCrime = [],
  scatterData = [],
  testData2 = [],
  colorHigh = [ 255, 96, 96 ],
  colorLow = [ 96, 112, 200 ];

// Get rent and crime from the our DB JSON endpoint
var endpoint = "http://limitless-cliffs-3918.herokuapp.com/neighborhoods.json";
//myData = httpGet( endpoint );
myData = httpGet( "http://localhost:3000/neighborhoods.json" );
myData = JSON.parse( myData );
//console.log(myData);

// Lock n load!
for ( i = 0; i < myData.length; i++ ) {
  if ( myData[ i ].AvgRentPrice > 0 ) {
    allRent.push( myData[ i ].AvgRentPrice );
  } else {
    console.log( "No rent for", myData[ i ].RegionName );
  }
  if ( myData[ i ].ViolentCrimePer10kCapita >= 0 ) {
    allCrime.push( myData[ i ].ViolentCrimePer10kCapita );
  } else {
    console.log( "No crime rate for", myData[ i ].RegionName );
  }
  // 2D array for google charts, with 3 columns
  scatterData.push(
    new Array(
      parseFloat( myData[ i ].AvgRentPrice ),
      parseFloat( myData[ i ].ViolentCrimePer10kCapita ),
      myData[ i ].RegionName + "\nAvg. Rent: " + myData[ i ].AvgRentPrice + "\n Crime per 10k: " + myData[ i ].ViolentCrimePer10kCapita ) );
  quickLookup[ myData[ i ].RegionName ] = {
    rent: parseFloat( myData[ i ].AvgRentPrice ),
    crime: myData[ i ].ViolentCrimePer10kCapita
  };
}
//console.log( quickLookup );
// Need to insert column titles at the beginning
//scatterData.unshift( new Array( "Rent", "Crime", "Neighborhood" ) );

// Find the highest and lowest rents crime rates
maxRent = Math.max.apply( null, allRent );
minRent = Math.min.apply( null, allRent );
maxCrime = Math.max.apply( null, allCrime );
minCrime = Math.min.apply( null, allCrime );

// Set up the map
function initialize() {
  map = new google.maps.Map( document.getElementById( "map-canvas" ) );
  var mapCenter = new google.maps.LatLng( myData[ 0 ].Latitude, myData[ 0 ].Longitude );
  var mapOptions = {
    zoom: 12,
    scrollwheel: false,
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
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

  // Set the neighborhood polygon styles appropriately
  setNeighborhoodColors();

  // These next two make the map responsive to mouseovers
  map.data
    .addListener( 'mouseover', function( event ) {
      hover = event.feature.k.NAME;
      //console.log( quickLookup[ hover ] );
      featureVectorChartData.setValue( 0, 1, 1 - ( Math.pow( Math.pow( quickLookup[ hover ].crime, 2 ) + Math.pow( quickLookup[ hover ].rent, 2 ), .5 ) / 9000 ) );
      featureVectorChartData.setValue( 1, 1, 1 - ( Math.pow( Math.pow( quickLookup[ hover ].crime, 5 ) + Math.pow( quickLookup[ hover ].rent, 2 ), .5 ) / 9000 ) );
      barChartData.setValue( 1, 1, quickLookup[ hover ].crime / maxCrime );
      barChartData.setValue( 0, 1, quickLookup[ hover ].rent / maxRent )
      drawBarChart();
      drawFeatureVectorChart();
      map.data
        .overrideStyle( event.feature, {
          strokeWeight: 2,
          strokeColor: 'white',
          zIndex: 999
        } );
      document.getElementById( "readout1" )
        .innerHTML = event.feature.getProperty( 'NAME' );
      document.getElementById( "readout2" )
        .innerHTML = "$" + quickLookup[ hover ].rent;
      document.getElementById( "readout3" )
        .innerHTML = quickLookup[ hover ].crime + "Violent Crimes per 10k";
    } );

  map.data
    .addListener( 'mouseout', function( event ) {
      map.data
        .overrideStyle( event.feature, {
          strokeWeight: 1,
          strokeColor: '#404040',
          zIndex: 0
        } );
    } );

  map.data.addListener( "click ", function( event ) {
    map.panTo( event.latLng );
  } );
  document.getElementById( "displayMode" )
    .innerHTML = displayMode;
  setNeighborhoodColors();
} // Initialize


// Utility functions used above
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
}

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

function getCrimeAndRent( regionName ) {
  localCrime = -1;
  myData.forEach( function( neighborhood, count ) {
    if ( neighborhood.RegionName === regionName ) {
      localCrime = parseFloat( neighborhood.ViolentCrimePer10kCapita );
      localRent = parseFloat( neighborhood.AvgRentPrice );
      return ( {
        crime: localCrime,
        rent: localRent
      } );
    }
  } );
}

function setReadout( innerHTML ) {
  document
    .getElementById( "readout" )
    .innerHTML = innerHTML;
}

function recenter( newCenter ) {
  map.panTo( newCenter );
}

function setDisplayMode() {
  displayMode = displayMode == 'crime' ? 'rent' : 'crime';
  document.getElementById( "displayMode" )
    .innerHTML = displayMode;
  setNeighborhoodColors();
}

function setNeighborhoodColors() {
  // Set the neighborhood polygon styles appropriately
  map.data.forEach( function( feature ) {
    var key = feature.getProperty( 'NAME' );
    //console.log( key );
    if ( quickLookup[ key ] ) {
      localCrime = quickLookup[ key ].crime;
      localRent = quickLookup[ key ].rent;
      map.data.overrideStyle( feature, {
        fillColor: displayMode == 'crime' ? interpolateToHex( localCrime / maxCrime ) : interpolateToHex( localRent / maxRent ),
        fillOpacity: .7
      } );
    } else {
      map.data.remove( feature );
    }
  } );
}

google.maps.event.addDomListener( window, 'load', initialize );