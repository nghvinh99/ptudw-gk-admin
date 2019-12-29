function userBlocking(checkbox, id) {
    if (checkbox.checked){
        if (confirm(
            "Bạn có chắc muốn khóa tài khoản này.\nChủ tài khoản sẽ không thể đăng nhập nữa!")) {
            $.ajax({
                url: '/users/block',
                type: 'POST',
                data: {
                    id: id
                },
                success: (data) => {
                    alert('Đã khóa tài khoản ');
                }
            })
        } else {
            checkbox.checked = false;
        }
    } else {
        if (confirm(
            "Bạn có chắc muốn mở tài khoản này.\nTài khoản sẽ có thể đăng nhập trở lại!")) {
            $.ajax({
                url: '/users/unblock',
                type: 'POST',
                data: {
                    id: id
                },
                success: (data) => {
                    alert('Đã mở tài khoản ');
                }
            })
        } else {
            checkbox.checked = true;
        }
    }
}

$(function () {
    $('#accountType').on('change', function () {
        const val = parseInt($(this).val());
        if (val == 0) {
            $.ajax({
                url: '/users/guest',
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    $('#userDetail').html('<tr></tr>');
                    data.forEach((user) => {
                        let block = '';
                        if (user.block) block = 'checked';
                        $('#userDetail').append(
                            '<tr><td class="tm-user-name">TODO</td>\
                            <td>TODO</td>\
                            <td>TODO</td>\
                            <td>'+ user.username + '</td>\
                            <td><input onchange="javascript:userBlocking(this,'+ user.id +');" type="checkbox" style="left: 20%;" '+ block + '></td></tr>'
                        )
                    })
                }
            })
        } else if (val == 1) {
            $.ajax({
                url: '/users/admin',
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    $('#userDetail').html('<tr></tr>');
                    data.forEach((user) => {
                        let block = '';
                        if (user.block) block = 'selected';
                        $('#userDetail').append(
                            '<td class="tm-user-name">TODO</td>\
                            <td>TODO</td>\
                            <td>TODO</td>\
                            <td>'+ user.username + '</td>\
                            <td></td>'
                        )
                    })
                }
            })
        }
    });
});

