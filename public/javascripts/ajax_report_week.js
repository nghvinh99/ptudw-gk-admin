function fetchData() {
    $.ajax({
        url: '/reports/weekananlysis',
        type: 'GET',
        data: {
            date: $('#datepicker').val()
        },
        dataType: 'JSON',
        success: (data) => {                 
            drawLineChart('Ngày', data.labels, data.dataset);
            updateTable(data.labels, data.orderCount, data.dataset);
        }
    })
}

$(function() {
    $('#submit').click(function() {
        fetchData();
    })

    $(window).resize(function () {
        updateLineChart();
    });
})