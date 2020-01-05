function fetchData() {
    $.ajax({
        url: '/reports/quarterananlysis',
        type: 'GET',
        data: {
            year: $('#yearpicker').val(),
            quarter: $('#quarterpicker').val()
        },
        dataType: 'JSON',
        success: (data) => {                 
            drawLineChart('Tháng', data.labels, data.dataset);
            updateTable(data.labels, data.orderCount, data.dataset);
        }
    })
}

$(function() {
    $('#yearpicker').on('change', function() {
        if ($('#quarterpicker').val()) {
            fetchData();
        }
    })
    $('#quarterpicker').on('change', function() {
        if ($('#yearpicker').val()) {
            fetchData();
        }
    })

    $(window).resize(function () {
        updateLineChart();
    });
})