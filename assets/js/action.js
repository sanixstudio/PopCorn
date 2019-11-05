$(document).ready(function () {

    const apiKey = "f3f124a7e3af05d748ddcefe10f25cb0";
    const imgDb = "http://image.tmdb.org/t/p/w185/";
    const genreUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=action&page=1&include_adult=false`;
    var genreId;

    $.ajax({

        url: genreUrl,
        method: 'GET'

    }).then(function (_data) {
        let results = _data.results;
        genreId = getGenreId();

        function getGenreId() {
            for (let each of results) {
                let idsArray = each.genre_ids;
                // console.log(each);

                if (idsArray.includes(28)) {
                    $('.action-movies').append(`<div class="results-container text-light">
                            <div class="float-left"><img src="${imgDb + each.poster_path}"></div>
                            <div class="m-title  movie-title">${each.original_title}</div>
                            <div class="m-title movie-popularity">${each.popularity}</div>
                            <div class="m-title movie-vote-count">${each.vote_count}</div>
                            <div class="m-title movie-vote-avg">${each.vote_average}</div>
                            <div class="m-title movie-release-year">${each.release_date}</div>
                            <div class="m-title movie-overview">${each.overview}</div>
                        </div>
                        `);
                }
            }
        }
    });


});