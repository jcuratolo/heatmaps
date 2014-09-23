 google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        /*
        var data = google.visualization.arrayToDataTable([
          ['Rent', 'Crime'],
          [ 8,      12],
          [ 4,      5.5],
          [ 11,     14],
          [ 4,      5],
          [ 3,      3.5],
          [ 6.5,    7]
        ]);
        */
        var data = google.visualization.arrayToDataTable(scatterData);
        
        var options = {
          title: 'Rent vs. Crime',
          hAxis: {title: 'Rent $', minValue: 0, maxValue: 15},
          vAxis: {title: 'Crime per 10k Capita', minValue: 0, maxValue: 15},
          legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

        chart.draw(data, options);
      }