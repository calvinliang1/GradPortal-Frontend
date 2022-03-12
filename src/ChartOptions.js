import React from "react";
import ReactDOM from "react-dom";

export var option1 = {
    chart: {
        plotBackgroundColor: "#d3dcc4",
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 300,
        width: 800
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
        }
    },
    title: {
      text: "Profile finished"
    },
    series: [{ 
      name: "Ratio",
      colorByPoint: true,
      data: [{name:"nationality_unfinished",y:20},{name:"academicinfo_unfinished",y:20},
      {name:"achievements_accomplishments_unfinished",y:20},{name:"work_academic_experiences_unfinished",y:20},
      {name:"research_unfinished",y:20},{name:"finished",y:0}]
    }]
  }

export var option2 = {
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
        data: [4, 3, 1],
        visible: false,
    }, {
        name: 'Networks',
        data: [2, 2, 2, 3, 1, 2, 3, 3, 2, 1],
        visible: false
    }, {
        name: 'Algorithms',
        data: [2, 3, 2, 1, 5, 1, 1, 1, 3, 5],
        visible: false
    }, {
        name: 'Distributed systems',
        data: [1, 1, 4, 2, 1, 1, 1, 1, 1, 1],
        visible: false
    }, {
        name: 'Informatics',
        data: [1, 1, 1, 2, 1, 2, 4, 1, 3, 1],
        visible: false
    }]
  }

  export const option3 = {
    chart: {
        height: 300,
        width: 500,
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        },
        series: {
            label: {
                connectorAllowed: false
            },
        }
    },
    xAxis: {
        accessibility: {
            rangeDescription: 'Range: January to December'
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Number of views'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    title: {
      text: "Profile views in the given months Jan-Dec"
    },
    series: [{
        name: 'Profile Views',
        data: [20, 100, 90, 120, 200, 40, 30, 15, 34, 56, 13, 25]
    },],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
  }

  export const option4 = {
    chart: {
        height: 300,
        width: 500,
        type: 'column'
    },
    plotOptions: {
         column: {
            stacking: 'normal'
        }
    },
    xAxis: {
        categories: [2021,2022]
    },
    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of activities'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    title: {
      text: "Total activities, grouped by year"
    },
    series: [{
        name: 'Grad Applications',
        data: [20, 15],
        stack: 'Jan'
    },{
        name: 'Resumes made',
        data: [5, 10],
        stack: 'Feb'
    },
    ],
    
  }