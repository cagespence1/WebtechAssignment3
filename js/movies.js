var token = sessionStorage.getItem('token');

$(function () {
    getMoviesFromDb();
});

function getMoviesFromDb() {
    $.ajax({
        url: 'http://localhost:3000/api/movies',
        type: 'GET',
        headers: {"Authorization": token},
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        success: function (movies) {

            console.log('Retrieved movies');

            for (var i = 0; i < movies.length; i++) {
                var movie = movies[i];
                loadRating(movie)
                    .then(function (response) {
                        insertMovieHTML(response[0], response[1])
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        error: function (data, status, error) {
            alert(data.responseJSON.message);
        }
    });
}

// function loadMovie(movie) {
//     Promise.all([loadRating(movie), loadPoster(movie)])
//         .then(function (result) {
//             console.log(result);
//             insertMovieHTML(movie, result[0], result[1]);
//         });
// }

/**
 * Adds a rating field to movie
 * @param movie
 * @returns {Promise}
 */
function loadRating(movie) {
    return new Promise(function (fulfill, reject) {
        $.ajax({
            url: 'http://localhost:3000/api/ratings/' + movie.tt_number,
            type: 'GET',
            headers: {"Authorization": token},
            contentType: 'application/json',
            dataType: 'json',
            processData: false,
            success: function (rating) {
                console.log("rating for " + movie.tt_number + " ", rating);
                movie.rating = rating.rating;
                fulfill([movie, rating.rating]);
            },
            error: function (data, status, error) {
                filfill([movie, 5]);
                reject(data.responseJSON.message);
            }
        });
    });
}

function generateStars(rating) {
    var starsHTML = '';
    for (i = 0; i < rating; i++) {
        starsHTML += '<i class="material-icons dark">star_rate</i>';
    }
    for (i = 0; i < (5 - rating); i++){
        starsHTML += '<i class="material-icons">star_rate</i>';
    }
    return starsHTML;
}

// function loadPoster(movie) {
//     return new Promise(function (resolve, reject) {
//         var url = 'http://localhost:3000/api/posters/' + movie.tt_number;
//         $.ajax({
//             url: url,
//             type: 'GET',
//             headers: {"Authorization": token},
//             contentType: 'application/json',
//             dataType: 'json',
//             processData: false,
//             success: function (poster) {
//                 resolve(poster);
//             },
//             error: function (data, status, error) {
//                 reject(data.responseJSON.error);
//             }
//         });
//     });
// }

function insertMovieHTML(movie, rating) {

    var title = movie.title;
    var description = movie.description;
    var tt_number = movie.tt_number;
    var url = movie.url;
    var director = movie.director;

    var cardTopHTML =
        '<div class="card" id="' + tt_number + ' style="width: 20rem">';

    var cardHeaderHTML = '<div class="card-header">' + director + '</div>';

    var cardImageUrlHTML =
        '<img class="card-img-top" src="' + url + '" alt="' + title + ' poster">';
    // '<div class="card-img-overlay"><h4 class="card-title">Card title</h4></div>';

    var cardBodyHTML =
        '<div class="card-body">';

    var cardTitleHTML =
        '<h4 class="card-title">' + title + '</h4>';

    var cardDescriptionHTML =
        '<p class="card-text">' + description + '</p>';

    var cardRatingHTML =
        '<a href="#" class="btn btn-warning">';

    var starsHTML =
        '<div class="dropdown">' +
        '<button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        generateStars(rating) +
        '</button>' +
        '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
        '<a class="dropdown-item" href="#">' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '</a>' +
        '<a class="dropdown-item" href="#">' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '</a>' +
        '<a class="dropdown-item" href="#">' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '</a>' +
        '<a class="dropdown-item" href="#">' +
        '<i class="material-icons">star_rate</i>' +
        '<i class="material-icons">star_rate</i>' +
        '</a>' +
        '<a class="dropdown-item" href="#">' +
        '<i class="material-icons">star_rate</i>' +
        '</a>' +
        '</div>' +
        '</div>';

    // generateStars(rating);

    var cardBottomHTML =
        '</a></div></div>';

    var moviesHTML =
        cardTopHTML +
        cardHeaderHTML +
        cardImageUrlHTML +
        cardBodyHTML +
        cardTitleHTML +
        cardDescriptionHTML +
        // cardRatingHTML +
        starsHTML +
        cardBottomHTML;

    console.log('Completed loading');

    $('.movie-container').append(moviesHTML);
}