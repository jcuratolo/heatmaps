google.setOnLoadCallback( initBarChart );
var barChart,
  barChartData,
  barChartOptions;

function initBarChart() {
  barChart = new google.visualization.BarChart( document.getElementById( 'bar_chart_div' ) );
  barChartData = google.visualization.arrayToDataTable( [
    [ 'Year', 'Sales' ],
    [ 'Rent', .7 ],
    [ 'Crime', .15 ],
  ] );
  drawBarChart();
}

barChartOptions = {
  title: 'Rent and Crime vs Max',
  animation: {
    duration: 250,
    easing: 'out'
  },
  isStacked: false,
  colors: [ '#ACE6E6', '#5665E6' ],
  backgroundColor: 'none',
  titleTextStyle: {
    color: '#FF4068',
    fontSize: 16,
    bold: true
  },
  legend: {
    position: 'none'
  },
  vAxis: {
    textStyle: {
      color: 'azure'
    },
  },
  hAxis: {
    textStyle: {
      color: 'azure'
    },
    baseline: 0,
    baselineColor: '#E6E6A1',
    ticks: [ .5, 1.0 ],
    ViewWindowMode: 'explicit',
    viewWindow: {
      max: 1.0,
      min: 0
    }
  }
};

function drawBarChart() {
  barChart.draw( barChartData, barChartOptions );
}