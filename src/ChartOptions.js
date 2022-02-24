import React from "react";
import ReactDOM from "react-dom";

export const option1 = {
    chart: {
        plotBackgroundColor: "#d3dcc4",
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 300,
        width: 400
    },
     tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    title: {
      text: "Profile finished"
    },
    series: [{ 
      name: "Ratio",
      colorByPoint: true,
      data: [{name:"completed",y:80},{name:"uncompleted",y:20}]
    }]
  }

export const option2 = {
    chart: {
        type: 'bar',
        height: 300,
        width: 400
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    xAxis: {
        categories: ['Bob', 'Alice', 'Shawn', 'Tyler', 'Liu', 'Rhee', 'Ahmed','Jones','Hughes','Seth']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fields interested'
        }
    },
    legend: {
        reversed: true
    },
    title: {
      text: "Professors field of interest"
    },
    series: [{
        name: 'AI',
        data: [4, 3, 0, 2, 2, 4, 0, 4, 1, 2]
    }, {
        name: 'Networks',
        data: [2, 2, 3, 3, 1, 2, 4, 3, 2, 1]
    }, {
        name: 'Algorithms',
        data: [2, 3, 2, 1, 5, 1, 1, 1, 3, 5]
    }, {
        name: 'Distributed systems',
        data: [1, 1, 4, 2, 1, 1, 1, 1, 1, 1]
    }, {
        name: 'Informatics',
        data: [1, 1, 1, 2, 1, 2, 4, 1, 3, 1]
    }]
  }