let currentProductPage = 1;

function enableAllPaginationButton() {
    $('#prevProductPage').attr("disabled", false);
    $('#firstProductPage').attr("disabled", false);
    $('#nextProductPage').attr("disabled", false);
    $('#lastProductPage').attr("disabled", false);
}

function disablePrevPage() {
    $('#prevProductPage').attr("disabled", true);
    $('#firstProductPage').attr("disabled", true);
}

function enablePrevPage() {
    $('#prevProductPage').attr("disabled", false);
    $('#firstProductPage').attr("disabled", false);
}

function disableNextPage() {
    $('#nextProductPage').attr("disabled", true);
    $('#lastProductPage').attr("disabled", true);
}

function enableNextPage() {
    $('#nextProductPage').attr("disabled", false);
    $('#lastProductPage').attr("disabled", false);
}

function removalConfirm(id) {
    var res = window.confirm("Bạn có chắc muốn XÓA sản phẩm này?\n Bấm OK để xóa")
    if (res) {
        window.location.href="/products/delete/" + id;
    }
}

function appendProductList(data) {
    let count = (currentProductPage - 1) * 10;
    $('#productDetail').html('<tr style="cursor: pointer;">');
    data.forEach((product) => {
        count += 1;
        $('#productDetail').append(
            '<tr style="cursor: pointer;" value="' + product.id + '">\
            <th class="single-product" scope="row">' + count + '</th>\
            <td class="single-product">' + product.name + '</td>\
            <td class="single-product">' + product.price + '</td>\
            <td class="single-product">' + product.views + '</td>\
            <td class="single-product">' + product.quantity + '</td>\
            <td><a class="tm-product-delete-link" onclick="removalConfirm('+ product.id +')">\
            <i class="far fa-trash-alt tm-product-delete-icon"></i>\
            </a>\</td>\</tr>'
        )
    })
}

$(function() {
    $('#productDetail').ready(function () {
        $.ajax({
            url: '/products/getproducts',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentProductPage
            },
            success: (data) => { appendProductList(data); }
        })
        $('#prevProductPage').attr("disabled", true);
        $('#firstProductPage').attr("disabled", true);    
    })
    $(document).on('click', '.single-product', function() {
        const id = $(this).parent().attr('value');
        window.location.href='/products/edit/' + id;
    })
})

$(function() {
    $('#nextProductPage').on('click', function() {
        currentProductPage += 1;
        $.ajax({
            url: '/products/getproducts',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentProductPage
            },
            success: (data) => { appendProductList(data); }
        });
        if (currentProductPage == parseInt($('#lastProductPage').attr('value'))) {
            disableNextPage();
            enablePrevPage();
        } else {
            enableAllPaginationButton();
        }
    });
    $('#prevProductPage').on('click', function() {
        currentProductPage -= 1;
        $.ajax({
            url: '/products/getproducts',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentProductPage
            },
            success: (data) => { appendProductList(data); }
        })
        if (currentProductPage == 1) {
            disablePrevPage();
            enableNextPage();
        } else {
            enableAllPaginationButton();
        }
    });
    $('#firstProductPage').on('click', function() {
        currentProductPage = 1;
        $.ajax({
            url: '/products/getproducts',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentProductPage
            },
            success: (data) => { appendProductList(data); }
        })
        enableNextPage();
        disablePrevPage();
    });
    $('#lastProductPage').on('click', function () {
        currentProductPage = $('#lastProductPage').attr('value');
        $.ajax({
            url: '/products/getproducts',
            type: 'GET',
            dataType: 'json',
            data: {
                page: currentProductPage
            },
            success: (data) => { appendProductList(data); }
        })
        enablePrevPage();
        disableNextPage();
    });
})

function appendFilter(data) {
    $('#filterList').html('<tr><tr>');
    data.forEach((item) => {
        $('#filterList').append(
            '<tr>\<td class="tm-product-name">'+ item.name +'</td>\
            <td class="text-center">\
            <a href="#" class="tm-product-delete-link">\
            <i class="far fa-trash-alt tm-product-delete-icon"></i>\
            </a>\</td>\</tr>'
        );
    })
}

$(function() {
    $('#filter').ready(function() {
        $.ajax({
            url: '/products/getbrand',
            type: 'GET',
            dataType: 'json',
            success: (data) => { appendFilter(data); }
        })
    })
    $('#filter').on('change', function() {
        const filter = parseInt($(this).val());
        console.log(filter);
        if (filter == 0) {
            $.ajax({
                url: '/products/getbrand',
                type: 'GET',
                dataType: 'json',
                success: (data) => { appendFilter(data); }
            })
        } else if (filter == 1) {
            $.ajax({
                url: '/products/getgroup',
                type: 'GET',
                dataType: 'json',
                success: (data) => { appendFilter(data); }
            })
        } else if (filter == 2) {
            $.ajax({
                url: '/products/gettype',
                type: 'GET',
                dataType: 'json',
                success: (data) => { appendFilter(data); }
            })
        }
    })
})