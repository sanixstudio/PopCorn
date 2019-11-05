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
                    $('.action-movies').append(`<div class="row p-2 text-light">
                            Original Title: ${each.original_title}<br>
                            Popularity: ${each.popularity}<br>
                            Votes Count: ${each.vote_count}<br>
                            Average Votes: ${each.vote_average}<br>
                            Overview: ${each.overview};
                        </div>
                        `);
                }
            }
        }
    });


});