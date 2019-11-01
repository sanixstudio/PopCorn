$(document).ready(function () {
    const apiKey = 'f3f124a7e3af05d748ddcefe10f25cb0';

    //  latest url
    let latestUrl = 'https://api.themoviedb.org/3/movie/latest?api_key=' + apiKey + '&language=en-US';
    // Upcoming url
    let upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + apiKey + '&language=en-US&page=10';
    // top rated
    let topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=en-US&page=1';
    // popular
    let popularUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=en-US&page=1';
    // now playing
    let nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey + '&language=en-US&page=1';

    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/555?api_key=' + apiKey,
        method: 'GET',
        dataType: 'json'
    }).then(data => {

        console.log(data)

    });
})


