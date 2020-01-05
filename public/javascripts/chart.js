const width_threshold = 480;
let optionsLine = {};
let lineChart = null;


function drawLineChart(xAxesLabels, labels, datasets) {
    Chart.defaults.global.defaultFontColor = 'white';
    optionsLine = {
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Doanh thu (VNĐ)"
                    }
                }
            ],
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: xAxesLabels
                    }
                }
            ]
        }
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio = $(window).width() < width_threshold ? false : true;
    configLine = {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Doanh thu",
                    data: datasets,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    cubicInterpolationMode: "monotone",
                    pointRadius: 0
                }
            ]
        },
        options: optionsLine
    };

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

function updateTable(labels, count, data) {
    let sumMoney = 0;
    let sumOrder = 0;
    $('#analysisCol').html('<tr></tr>');
    for (let i=0;i<count.length;i++) {
        sumMoney += data[i];
        sumOrder += count[i];
        $('#analysisCol').append(
            '<tr>\
            <td>'+ labels[i] +'</td>\
            <td>'+ count[i] +'</td>\
            <td>'+ data[i] +'</td>\
            </tr>'
        )
    }
    $('#analysisCol').append(
        '<tr>\
        <td>Tổng:</td>\
        <td>'+ sumOrder +'</td>\
        <td>'+ sumMoney +'</td>\
        </tr>'
    )
}