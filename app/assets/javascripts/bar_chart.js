google.setOnLoadCallback( initBarChart );
var barChart,
  barChartData,
  barChartOptions;

function initBarChart() {
  barChart = new google.visualization.BarChart( document.getElementById( 'bar_chart_div' ) );
  barChartData = google.visualization.arrayToDataTable( [
    [ 'Category', '' ],
    [ 'Rent', .5 ],
    [ 'Crime', .5 ],
  ] );
  drawBarChart();
}

barChartOptions = {
  title: 'Relative to Highest',
  animation: {
    duration: 125,
    easing: 'out'
  },
  isStacked: false,
  colors: [ '#86b3b3', '#5665E6' ],
  backgroundColor: 'none',
  titleTextStyle: {
    color: '#FF4068',
    fontSize: 12,
    bold: false
  },
  legend: {
    position: 'none'
  },
  vAxis: {
    textStyle: {
      color: 'azure'
    },
    gridlines: {
      color: '#808080'
    },
  },
  hAxis: {
    textStyle: {
      color: 'azure'
    },
    baseline: 0,
    baselineColor: '#6070FF',
    gridlines: {
      color: '#808080'
    },
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