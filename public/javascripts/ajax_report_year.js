$(function() {
    $('#yearpicker').on('change', function() {
        $.ajax({
            url: '/reports/yearananlysis',
            type: 'GET',
            data: { year: $(this).val() },
            dataType: 'JSON',
            success: (data) => {                 
                drawLineChart('Tháng', data.labels, data.dataset);
                updateTable(data.labels, data.orderCount, data.dataset);
            }
        })
    })

    $(window).resize(function () {
        updateLineChart();
    });
})