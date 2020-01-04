function drawPieChart(configPie) {
    if ($("#pieChart").length) {
        var chartHeight = 300;

        $("#pieChartContainer").css("height", chartHeight + "px");

        ctxPie = document.getElementById("pieChart").getContext("2d");

        pieChart = new Chart(ctxPie, configPie);
    }
}

$(function () {
    Chart.defaults.global.defaultFontColor = 'white';
    $('#reportsPage').ready(function () {
        $.ajax({
            url: '/ordersstate',
            type: 'GET',
            dataType: 'json',
            success: (orders) => {
                const optionsPie = {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10
                        }
                    },
                    legend: {
                        position: "top"
                    }
                };
                const configPie = {
                    type: "pie",
                    data: {
                        datasets: [
                            {
                                data: [orders.Pending, orders.Delivering, orders.Delivered,],
                                backgroundColor: ["#1AFF1A", "#FFA31A", "#F7604D"],
                                label: "Storage"
                            }
                        ],
                        labels: [
                            'Chưa giao (' + orders.Pending + ')',
                            'Đang giao (' + orders.Delivering + ')',
                            'Đã giao (' + orders.Delivered + ')'
                        ]
                    },
                    options: optionsPie
                };
                drawPieChart(configPie);
            }
        });
        $.ajax({
            url: '/todayincome',
            type: 'GET',
            dataType: 'json',
            success: () => {
            }
        });
    })






    drawLineChart();
    // drawBarChart();

    $(window).resize(function () {
        updateLineChart();
        // updateBarChart();
    });
})