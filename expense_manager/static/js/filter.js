// search button listener
function searchBtnClickListener() {
    $('#searchForm').on('submit', function (e) {
        var data = $('#searchInput').val()
        if (data != null && data != '' && data != undefined) {
            if (parseFloat(data)) {
                // search for price
                $('#searchInput').prop('name', 'price')
            } else {
                // search for name
                $('#searchInput').prop('name', 'name')
            }
        } else {
            e.preventDefault()
        }
    });
}

// insert image param
function insertImageParam(key, value) {
    key = encodeURI(key);
    value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');
    console.log(kvp);

    var i = kvp.length;
    var x;
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == 'photo__ne' || x[0] == 'photo' || x[0] == 'limit' || x[0] == 'offset' || x[0] == '') {
            kvp.splice(i, 1)
        }
    }

    // not found in current url then add key value
    if (key != '') {
        kvp[kvp.length] = [key, value].join('=')
    }

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
}

// insert date param
function insertDateParam(key, value, date_value) {
    key = encodeURI(key);
    value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');
    console.log(kvp);

    var i = kvp.length;
    var x;
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == 'created' || x[0] == 'created__range' || x[0] == 'date' || x[0] == 'limit' || x[0] == 'offset' || x[0] == '') {
            kvp.splice(i, 1)
        }
    }

    // not found in current url then add key value
    if (key != '') {
        kvp[kvp.length] = [key, value].join('=');
        kvp[kvp.length] = ['date', date_value].join('=');
    }

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
}


// has image or no image logic click listener
function imageBtnClickListener() {
    $('#imageNoFilter').on('click', function (e) {
        $('#imageFilter').text('Image Filter')
        insertImageParam('', '')

    });
    $('#hasImage').on('click', function (e) {
        $('#imageFilter').text('Has Image')
        insertImageParam('photo__ne', '')
    });
    $('#noImage').on('click', function (e) {
        $('#imageFilter').text('No Image')
        insertImageParam('photo', '')
    });
}


function dateBtnClickListener() {
    var today = new Date();
    var dd = ("0" + today.getDate()).slice(-2)
    var mm = ("0" + (today.getMonth() + 1)).slice(-2)
    var yyyy = today.getFullYear();

    $('#dateNoFilter').on('click', function (e) {
        $('#dateFilter').text('Date Filter')
        insertDateParam('', '', '')
    });
    $('#today').on('click', function (e) {
        $('#dateFilter').text('Today')
        // var date_formatted = yyyy + "-" + mm + "-" + dd
        var next_day = today.getDate() + 1;
        var curr = new Date();
        var next_day = new Date(curr.setDate(next_day))

        var date_formatted = yyyy + "-" + mm + "-" + dd;
        date_formatted = date_formatted + "," + next_day.getFullYear() + "-" + ("0" + (next_day.getMonth() + 1)).slice(-2) + "-" + ('0' + next_day.getDate()).slice(-2);

        insertDateParam('created__range', date_formatted, 'today')

    });
    $('#thisWeek').on('click', function (e) {
        $('#dateFilter').text('This Week')

        var first = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6;
        var curr = new Date();
        var first = new Date(curr.setDate(first));
        var last = new Date(curr.setDate(last))
        console.log(first, last);

        var date_formatted = first.getFullYear() + "-" + ("0" + (first.getMonth() + 1)).slice(-2) + "-" + ('0' + first.getDate()).slice(-2);
        date_formatted = date_formatted + "," + last.getFullYear() + "-" + ("0" + (last.getMonth() + 1)).slice(-2) + "-" + ('0' + last.getDate()).slice(-2);

        insertDateParam('created__range', date_formatted, 'this-week')
    });
    $('#previousWeek').on('click', function (e) {
        $('#dateFilter').text('Previous Week')
        var first = today.getDate() - today.getDay() - 7; // First day is the day of the month - the day of the week
        var last = first + 6;
        var curr = new Date();
        var first = new Date(curr.setDate(first));
        var last = new Date(curr.setDate(last))
        var date_formatted = first.getFullYear() + "-" + ("0" + (first.getMonth() + 1)).slice(-2) + "-" + ('0' + first.getDate()).slice(-2);
        date_formatted = date_formatted + "," + last.getFullYear() + "-" + ("0" + (last.getMonth() + 1)).slice(-2) + "-" + ('0' + last.getDate()).slice(-2);
        insertDateParam('created__range', date_formatted, 'previous-week')
    });
    $('#thisMonth').on('click', function (e) {
        $('#dateFilter').text('This Month')
        var first = new Date(today.getFullYear(), today.getMonth(), 1);
        var last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        var date_formatted = first.getFullYear() + "-" + ("0" + (first.getMonth() + 1)).slice(-2) + "-" + ('0' + first.getDate()).slice(-2);
        date_formatted = date_formatted + "," + last.getFullYear() + "-" + ("0" + (last.getMonth() + 1)).slice(-2) + "-" + ('0' + last.getDate()).slice(-2);
        insertDateParam('created__range', date_formatted, 'this-month')
    });
}


// on document ready auto code execute
$(function () {
    imageBtnClickListener()
    searchBtnClickListener()
    dateBtnClickListener()
});