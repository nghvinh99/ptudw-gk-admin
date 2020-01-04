function drawLineChart(configLine) {
    if ($("#lineChart").length) {
        ctxLine = document.getElementById("lineChart").getContext("2d");
        lineChart = new Chart(ctxLine, configLine);
    }
}

function updateLineChart() {
    if (lineChart) {
      lineChart.options = optionsLine;
      lineChart.update();
    }
  }


function process() {
    optionsLine = {
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Hits"
                    }
                }
            ]
        }
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
        $(window).width() < width_threshold ? false : true;

    configLine = {
        type: "line",
        data: {
            labels: [
                "1",
                "3",
                "5",
                "7",
                "9",
                "11",
                "13",
                "15",
                "17",
                "19",
                "21",
                "23",
                "25",
                "27",
                "29",
            ],
            datasets: [
                {
                    label: "Doanh thu",
                    data: [200, 300, 200, 300, 250, 200, 400, 200, 300, 130, 100, 520, 120, 410, 210],
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    cubicInterpolationMode: "monotone",
                    pointRadius: 0
                },
                {
                    label: "Kì vọng",
                    data: [300, 350, 300, 250, 300, 350, 400, 220, 330, 200, 120, 600, 120, 300, 300],
                    fill: false,
                    borderColor: "rgba(255,99,132,1)",
                    cubicInterpolationMode: "monotone",
                    pointRadius: 0
                },
            ]
        },
        options: optionsLine
    };

    drawLineChart(configLine);
}