 google.load( "visualization", "1", {
   packages: [ "corechart" ]
 } );
 google.setOnLoadCallback( drawChart );

 function drawChart() {
   var data = new google.visualization.DataTable();
   data.addColumn( 'number', 'Rent' );
   data.addColumn( 'number', 'Crime' );
   data.addColumn( {
     type: 'string',
     role: 'tooltip'
   } );
   data.addRows( scatterData );

   var options = {
     title: 'LA Metro',
     titleTextStyle: {
       color: '#FF4068',
       fontSize: 12,
       bold: false
     },
     colors: [ '#ACE6E6', '5665E6' ],
     dataOpacity: .9,
     pointSize: 1,
     backgroundColor: 'none',
     legend: 'none',
     hAxis: {
       title: 'Rent $',
       minValue: 0,
       maxValue: maxRent,
       baselineColor: '#6070FF',
       gridlines: {
         count: 0
       },
       titleTextStyle: {
         color: 'Azure'
       },
       //ticks: [ 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 ],
       lineWidth: 0
     },
     vAxis: {
       title: 'Crime',
       minValue: 0,
       maxValue: maxCrime,
       titleTextStyle: {
         color: 'azure'
       },
       baselineColor: '#6070FF',
       gridlines: {
         count: 0
       },
       titleTextStyle: {
         color: 'Azure'
       },
       lineWidth: 0
     }
   };

   var chart = new google.visualization.ScatterChart( document.getElementById( 'scatter_chart_div' ) );

   chart.draw( data, options );
 }