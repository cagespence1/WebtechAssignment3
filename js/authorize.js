var loggedInHTML =
    // '<!-- Account button -->' +
    // '<button type="button" class="btn btn-link">' +
    // 'Account' +
    // '</button>' +
    // '<!-- Logout button -->' +
    // '<button type="button" class="btn btn-primary" id="logout-button">' +
    // 'Logout' +
    // '</button>';
    '<a class="dropdown-item" href="#">My ratings</a>'+
    '<a class="dropdown-item" href="#" id="logout-button" >Logout</a>';

var loggedOutHTML =
    // '<!-- Register modal button -->' +
    // '<button type="button" class="btn btn-link " data-toggle="modal" data-target="#register-modal">Register' +
    // '</button>' +
    // '<!-- Login modal button -->' +
    // '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#login-modal">' +
    // 'Login' +
    // '</button>';
    '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#login-modal">Login</a>'+
    '<a class="dropdown-item" href="#" data-toggle="modal" data-target="#register-modal">Register</a>';

updateLoginStatus = function (loggedIn) {
    var container = $('.login-container');
    if (loggedIn === "true") {
        $(container).html(loggedInHTML);
        $("#logout-button").on("click", logout);
    } else {
        $(container).html(loggedOutHTML);
        $("#login-button").on("click", login);
    }
};

$(function () {
    var token = sessionStorage.getItem('token');
    verifyToken(token);
});

function verifyToken(token) {
    $.ajax({
        url: 'http://localhost:3000/api/authorize',
        type: 'GET',
        headers: {"Authorization": token},
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        success: function (response) {
            console.log(response);
            updateLoginStatus(response)
        },
        error: function (data, status, error) {
            console.log('user is not logged in');
            updateLoginStatus(false)
        }
    });
}

function login() {
    var username = $("#login-username").val();
    var password = $("#login-password").val();
    $.ajax({
        url: 'http://localhost:3000/api/authorize',
        type: 'POST',
        data: JSON.stringify(
            {username: username, password: password}
        ),
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        success: function (response) {
            console.log('Logged in');
            console.log(response.token);
            $('#login-modal').modal('toggle');
            sessionStorage.setItem('token', response.token);
            updateLoginStatus('true');
        },
        error: function (data, status, error) {
            alert(data.responseJSON.message);
        }
    });
}

function logout() {
    console.log('Logged out');
    sessionStorage.clear();
    updateLoginStatus('false');
}
