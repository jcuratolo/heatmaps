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
  hAxis: {
    textStyle: {
      color: 'azure',
      baselineColor: '#6070FF'
    },
  },
  vAxis: {
    textStyle: {
      color: 'azure'
    },
    gridlines: {
      color: '#808080'
    },
    baseline: 0,
    baselineColor: '#6070FF',
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