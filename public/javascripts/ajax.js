let currentPage = 1;

function userBlocking(checkbox, id) {
    if (checkbox.checked) {
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

function appendUserList(data) {
    let count = (currentPage - 1) * 10;
    $('#userDetail').html('<tr></tr>');
    data.forEach((user) => {
        count += 1;
        let block = '';
        if (user.block) block = 'checked';
        $('#userDetail').append(
            '<tr><td>' + count + '</td>\
            <td class="tm-user-name">TODO</td>\
            <td>TODO</td>\
            <td>TODO</td>\
            <td>'+ user.username + '</td>\
            <td><input onchange="javascript:userBlocking(this,'+ user.id + ');" type="checkbox" style="left: 20%;" ' + block + '></td></tr>'
        )
    })
}

$(function () {
    $('#userDetail').ready(function () {
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            success: (data) => { appendUserList(data); }
        })
        $('#prevUserPage').attr("disabled", true);
        $('#firstUserPage').attr("disabled", true);
    })
    $('#accountType').on('change', function () {
        const val = parseInt($(this).val());
        if (val == 0) {
            $.ajax({
                url: '/users/guest',
                type: 'GET',
                dataType: 'json',
                success: (data) => { appendUserList(data); }
            })
        } else if (val == 1) {
            $.ajax({
                url: '/users/admin',
                type: 'GET',
                dataType: 'json',
                success: (data) => {
                    $('#userDetail').html('<tr></tr>');
                    let count = 0;
                    data.forEach((user) => {
                        count += 1;
                        $('#userDetail').append(
                            '<tr><td>' + count + '</td>\
                            <td class="tm-user-name">TODO</td>\
                            <td>TODO</td>\
                            <td>TODO</td>\
                            <td>'+ user.username + '</td>\
                            <td></td></tr>'
                        )
                    })
                }
            })
        }
    });
});

function enableAllPaginationButton() {
    $('#prevUserPage').attr("disabled", false);
    $('#firstUserPage').attr("disabled", false);
    $('#nextUserPage').attr("disabled", false);
    $('#lastUserPage').attr("disabled", false);
}

function disablePrevPage() {
    $('#prevUserPage').attr("disabled", true);
    $('#firstUserPage').attr("disabled", true);
}

function enablePrevPage() {
    $('#prevUserPage').attr("disabled", false);
    $('#firstUserPage').attr("disabled", false);
}

function disableNextPage() {
    $('#nextUserPage').attr("disabled", true);
    $('#lastUserPage').attr("disabled", true);
}

function enableNextPage() {
    $('#nextUserPage').attr("disabled", false);
    $('#lastUserPage').attr("disabled", false);
}

$(function () {
    $('#nextUserPage').on('click', function () {
        currentPage += 1;
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentPage
            },
            success: (data) => { appendUserList(data); }
        })
        if (currentPage == parseInt($('#lastUserPage').attr('value'))) {
            disableNextPage();
        } else {
            enableAllPaginationButton();
        }
    })
    $('#prevUserPage').on('click', function () {
        currentPage -= 1;
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentPage
            },
            success: (data) => { appendUserList(data); }
        })
        if (currentPage == 1) {
            disablePrevPage();
        } else {
            enableAllPaginationButton();
        }
    })
    $('#firstUserPage').on('click', function () {
        currentPage = 1;
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentPage
            },
            success: (data) => { appendUserList(data); }
        })
        enableNextPage();
        disablePrevPage();
    })
    $('#lastUserPage').on('click', function () {
        currentPage = $('#lastUserPage').attr('value');
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentPage
            },
            success: (data) => { appendUserList(data); }
        })
        enablePrevPage();
        disableNextPage();
    })
})
