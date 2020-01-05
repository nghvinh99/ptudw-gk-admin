function fetchData() {
    $.ajax({
        url: '/reports/monthananlysis',
        type: 'GET',
        data: {
            year: $('#yearpicker').val(),
            month: $('#monthpicker').val()
        },
        dataType: 'JSON',
        success: (data) => {                 
            drawLineChart('Ngày', data.labels, data.dataset);
            updateTable(data.labels, data.orderCount, data.dataset);
        }
    })
}

$(function() {
    $('#yearpicker').on('change', function() {
        if ($('#monthpicker').val()) {
            fetchData();
        }
    })
    $('#monthpicker').on('change', function() {
        if ($('#yearpicker').val()) {
            fetchData();
        }
    })

    $(window).resize(function () {
        updateLineChart();
    });
})