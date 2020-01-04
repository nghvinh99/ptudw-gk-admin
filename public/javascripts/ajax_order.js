$(function () {
    let lastSel = $("#my_select option:selected");

    $(".custom-select").on('click', function(){
        lastSel = $(".custom-select option:selected");
    });

    $('.custom-select').on('change', function() {
        const id = $(this).parent().attr('id');
        const newState = $(this).children("option:selected").val();
        const r = confirm("Đổi trạng thái đơn hàng này?");
        if (r) {
            $.ajax({
                url: '/orders/editstate',
                type: 'POST',
                data: { id, newState },
                success: () => {
                    alert("Đã thay đổi trạng thái của đơn hàng");
                }
            })
        } else {
            lastSel.prop("selected", true);
        }
    })
})