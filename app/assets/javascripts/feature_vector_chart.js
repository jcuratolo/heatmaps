google.setOnLoadCallback( initFeatureVectorChart );
var featureVectorChart;
var featureVectorChartData;

function initFeatureVectorChart() {
  featureVectorChart = new google.visualization.ColumnChart( document.getElementById( 'feature_vector_chart_div' ) );
  featureVectorChartData = google.visualization.arrayToDataTable( [
    [ 'Year', 'Sales' ],
    [ 'Rent', .7 ]
  ] );
  drawFeatureVectorChart();
}

var options = {
  title: 'Composite Score',
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
  hAxis: {
    textStyle: {
      color: 'azure'
    },
  },
  vAxis: {
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

function drawFeatureVectorChart() {
  featureVectorChart.draw( featureVectorChartData, options );
}