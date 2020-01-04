let currentUserPage = 1;

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

function appendUserList(data) {
    let count = (currentUserPage - 1) * 10;
    $('#userDetail').html('<tr></tr>');
    data.forEach((user) => {
        count += 1;
        let block = '';
        if (user.block) block = 'checked';
        $('#userDetail').append(
            '<tr class="tm-user-name" value="'+ user.id +'" style="cursor: pointer">\
            <td>' + count + '</td>\
            <td>'+ user.name +'</td>\
            <td>'+ user.email +'</td>\
            <td>'+ user.phone +'</td>\
            <td>'+ user.username + '</td>\
            <td><input onchange="javascript:userBlocking(this,'+ user.id + ');" type="checkbox" style="left: 20%;" ' + block + '></td>\
            </tr>'
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
        disablePrevPage();
        if (currentUserPage >= parseInt($('#lastUserPage').attr('value'))) {
            disableNextPage();
        } else {
            enableNextPage();
        }
    })
    $('#accountType').on('change', function () {
        const val = parseInt($(this).val());
        if (val == 0) {
            $.ajax({
                url: '/users/guest',
                type: 'GET',
                dataType: 'json',
                success: (data) => { appendUserList(data); }
            });
            disablePrevPage();
            if (currentUserPage >= parseInt($('#lastUserPage').attr('value'))) {
                disableNextPage();
            } else {
                enableNextPage();
            }
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
                            '<tr class="tm-user-name" value="'+ user.id +'" style="cursor: pointer">\
                            <td>' + count + '</td>\
                            <td>'+ user.name +'</td>\
                            <td>'+ user.email +'</td>\
                            <td>'+ user.phone +'</td>\
                            <td>'+ user.username + '</td>\
                            <td></td></tr>'
                        )
                    })
                }
            });
            disableNextPage();
            disablePrevPage();
        }
    });
});

$(function () {
    $('#nextUserPage').on('click', function () {
        currentUserPage += 1;
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentUserPage
            },
            success: (data) => { appendUserList(data); }
        })
        if (currentUserPage == parseInt($('#lastUserPage').attr('value'))) {
            disableNextPage();
            enablePrevPage();
        } else {
            enableNextPage();
            enablePrevPage();
        }
    })
    $('#prevUserPage').on('click', function () {
        currentUserPage -= 1;
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentUserPage
            },
            success: (data) => { appendUserList(data); }
        })
        if (currentUserPage == 1) {
            disablePrevPage();
            enableNextPage();
        } else {
            enableNextPage();
            enablePrevPage();
        }
    })
    $('#firstUserPage').on('click', function () {
        currentUserPage = 1;
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentUserPage
            },
            success: (data) => { appendUserList(data); }
        })
        enableNextPage();
        disablePrevPage();
    })
    $('#lastUserPage').on('click', function () {
        currentUserPage = $('#lastUserPage').attr('value');
        $.ajax({
            url: '/users/guest',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentUserPage
            },
            success: (data) => { appendUserList(data); }
        })
        enablePrevPage();
        disableNextPage();
    })
});

function fillUserInfo(data) {
    $('#name').html(data.name);
    const date = new Date(data.DoB);
    if (date instanceof Date && !isNaN(date)) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        $('#DoB').html(day + ' tháng ' + month + ', ' + year);
    } else {
        $('#DoB').html('');
    }
    $('#email').html(data.email);
    if (data.gender){
        $('#gender').html("Nam");
    } else {
        $('#gender').html("Nữ");
    }
    $('#phone').html(data.phone);
    $('#account').html(data.username);
    if (data.avatar) {
        $('#avatar').attr('src', data.avatar);
    } else {
        $('#avatar').attr('src', '');
    }
}

$(function() {
    $(document).on('click', '.tm-user-name', function (){
        const id = parseInt($(this).attr('value'));
        const val = parseInt($('#accountType').val());
        if (val == 0) {
            $.ajax({
                url: '/users/info',
                type: 'GET',
                dataType: 'json',
                data: {id},
                success: (data) => {
                    fillUserInfo(data);
                 }
            })
        } else {
            $.ajax({
                url: '/users/admin/info',
                type: 'GET',
                dataType: 'json',
                data: {id},
                success: (data) => {
                    fillUserInfo(data);
                 }
            })
        }
    })
})