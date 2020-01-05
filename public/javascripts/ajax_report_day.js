function updateDayTable(data) {
    let sumMoney = 0;
    let sumOrder = 0;
    $('#analysisCol').html('<tr></tr>');
    for (let i=0;i<count.length;i++) {
        sumMoney += data[i];
        sumOrder += count[i];
    }
    $('#analysisCol').append(
        '<tr>\
        <td>Tổng:</td>\
        <td>'+ sumOrder +'</td>\
        <td>'+ sumMoney +'</td>\
        </tr>'
    )
}

function fetchData() {
    $.ajax({
        url: '/reports/dayananlysis',
        type: 'GET',
        data: {
            date: $('#datepicker').val()
        },
        dataType: 'JSON',
        success: (data) => {                 
            drawLineChart('Đơn hàng', data.labels, data.dataset);
            updateDayTable(data.dataset);
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