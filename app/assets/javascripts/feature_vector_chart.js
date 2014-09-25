google.setOnLoadCallback( initFeatureVectorChart );
var featureVectorChart;
var featureVectorChartData;

function initFeatureVectorChart() {
  featureVectorChart = new google.visualization.BarChart( document.getElementById( 'feature_vector_chart_div' ) );
  featureVectorChartData = google.visualization.arrayToDataTable( [
    [ 'Category', 'Magnitude' ],
    [ 'Composite', .7 ],
    [ 'Special', .7 ]
  ] );
  drawFeatureVectorChart();
}

var options = {
  title: 'Composite Score',
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
      color: 'azure',
      baselineColor: '#6070FF'
    },
  },
  hAxis: {
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