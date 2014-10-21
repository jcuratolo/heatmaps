 // Load the Visualization API and the controls package.
 google.load( 'visualization', '1.0', {
   'packages': [ 'controls' ]
 } );

 // Set a callback to run when the Google Visualization API is loaded.
 google.setOnLoadCallback( drawDashboard );

 // Callback that creates and populates a data table,
 // instantiates a dashboard, a range slider and a pie chart,
 // passes in the data and draws it.
 function drawDashboard() {

   // Create our data table.
   var data = google.visualization.arrayToDataTable( [
     [ 'Name', 'Donuts eaten' ],
     [ 'Michael', 5 ],
     [ 'Elisa', 7 ],
     [ 'Robert', 3 ],
     [ 'John', 2 ],
     [ 'Jessica', 6 ],
     [ 'Aaron', 1 ],
     [ 'Margareth', 8 ]
   ] );

   // Create a dashboard.
   var dashboard = new google.visualization.Dashboard(
     document.getElementById( 'dashboard_div' ) );

   // Create a range slider, passing some options
   var donutRangeSlider = new google.visualization.ControlWrapper( {
     'controlType': 'NumberRangeFilter',
     'containerId': 'filter_div',
     'options': {
       'filterColumnLabel': 'Donuts eaten'
     }
   } );



   // Establish dependencies, declaring that 'filter' drives 'pieChart',
   // so that the pie chart will only display entries that are let through
   // given the chosen slider range.
   dashboard.bind( donutRangeSlider );

   // Draw the dashboard.
   dashboard.draw( data );
 }