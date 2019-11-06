$(document).ready(function () {

    // code test area ----------------------------------------------------------
    let clickedBro = [];
    let movieName = "";

    $(document).on('click', '#logoRating', function () {
        clickedBro.push($(document.querySelector("#logoRating")))
        console.log($(document.querySelector("#logoRating")))
    })

    //  Firebase data info 
    var firebaseConfig = {
        apiKey: "AIzaSyBl3V6CpqPAg1IgJjkyypLhqDhWERQeSuA",
        authDomain: "popcorn-e62a5.firebaseapp.com",
        databaseURL: "https://popcorn-e62a5.firebaseio.com",
        projectId: "popcorn-e62a5",
        storageBucket: "popcorn-e62a5.appspot.com",
        messagingSenderId: "377613950671",
        appId: "1:377613950671:web:890c3f4dd96ea206da21ba"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    db.ref().set('value', snap => {


    })

    db.ref().on('value', function (snap) {
        // console.log(snap.val().movies);
    });

    // const apiKey;
    const apiKey = "f3f124a7e3af05d748ddcefe10f25cb0";
    const imgDb = "http://image.tmdb.org/t/p/w185/";
    const urlUpcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=${apiKey}`;
    const urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${apiKey}`;
    const urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${apiKey}`;
    const urlSearchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`;
    const genreUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=action&page=1&include_adult=false`;

    getMoviesData(urlNowPlaying, $('#playingNow'));
    getMoviesData(urlUpcomingMovies, $('#upcomingMovies'));
    getMoviesData(urlTopRatedMovies, $('#topRated'));

    // get the user input in the search area and search for movies
    $('#searchbox').on('keypress', function (e) {

        if (e.key === "Enter") {
            e.preventDefault()
            $('.search-result').empty()
            movieName = $('#searchbox').val();
            console.log('Hello');

            $('#slider').empty();
            $('#each-genre').empty();
            $('#about2-page').empty();
            $('#posters-container').empty();
            // $('.search-results').css('display', 'unset');

            getQueryResultSearch(movieName);
        }
    });

    // function to get movies by movie name
    function getQueryResultSearch(moviename) {
        let queryurl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`;
        $.ajax({
            url: queryurl,
            method: 'GET'
        }).then(function (result) {
            let results = result.results;
            // console.log(result.results);

            for (let pages in results) {
                let searchResults = $(`
                    <div class="search-title each-search-result">
                        <h3 class="main-results-heading">${results[pages].original_title}</h3>
                        <div class="search-results-heading"><span class="text-light">Popularity:</span> ${Math.round(results[pages].popularity)}</div>
                        <div class="search-results-heading"><span class="text-light">Total Votes:</span> ${results[pages].vote_count}</div>
                        <div class="search-results-heading"><span class="text-light">Average Votes:</span> ${results[pages].vote_average}</div>
                        <div class="search-results-heading"><span class="text-light">Release Year:</span> ${results[pages].release_date}</div>
                        <div class="search-results-heading"><span class="text-light">Overview: </span>${results[pages].overview}</div>
                    </div>
                    `);
                console.log(searchResults)

                $('.search-result').append(searchResults);
                $('#searchbox').val('');
            }
        });
    }

    // get the movies poster by given url and append it to the given containerId
    function getMoviesData(siteUrl, containerId) {
        $.ajax({

            url: siteUrl,
            method: 'GET'

        }).then(function (_data) {

            let results = _data.results;

            for (let element in results) {
                allPosters = results[element].poster_path;
                let posterImg = `<div>
                        <img class="img-fluid img-thumbnail" src="${imgDb + allPosters}" alt="">
                        <img src="./aeon-favourites-yellow-star-icon-png-clipart.png" alt="" id="logoRating">
                        </div>`;
                $(containerId).append(posterImg);
            }
        });
    }


    ////////////////////////////////////
    // Get movies by clicking on genre

    $('.genre-options').on('click', function () {
        let genreId = parseInt(this.getAttribute("data"));

        $('#each-genre').empty();
        $('#slider').empty();
        $('#posters-container').empty();
        $('#about2-page').empty();

        getMovieByGenre(genreId);
    });

    // get search results
    function getMovieByGenre(genreId) {
        $.ajax({

            url: genreUrl,
            method: 'GET'

        }).then(function (_data) {
            let results = _data.results;
            // console.log(results);

            for (let each of results) {
                let idsArray = each.genre_ids;

                if (idsArray.includes(genreId)) {
                    $('#each-genre').append(`<div class="genre-result results-container text-light">
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
        });
    }

    ///////////////////////////////
    // About page

    $('#about').on('click', function(){

        
        $('#each-genre').children().fadeOut(500).promise().then(function() {
            $('#each-genre').empty();
        });

       
        $('#slider').children().fadeOut(500).promise().then(function() {
            $('#slider').empty();
        });

       
        $('#posters-container').children().fadeOut(500).promise().then(function() {
            $('#posters-container').empty();
        });
        
        
        $('.search-result').children().fadeOut(500).promise().then(function() {
            $('.search-result').empty();
        });

        $('#about2-page').append(`
            <div class="container-fluid "><main class="container-fluid text-left">
            <div class="row text-light"><h3 class="cat-title">About Us</h3>
            <div class="about-us"><h2>Team Members</h2><ul><li>Mathew</li><li>Mohamed</li>
            <li>Huan</li><li>Adnan</li></ul><p>Hi everyone, this is team PopCorn, a 
            full-stack developer team based in San Francisco.PopCorn is a modern and faster 
            project delivery service and quality service provider in the field of WebDesign, 
            Prototyping, and web-based apps creation. Our team's first member Mohamed handles 
            the APIs requests, our second team's member Huan handle and controls fireBase
            data, our third team's member Mathew provides all kind of support during the project
            completing and our fourth team's member Adnan handle the core design of the project.
            </p><table><tr><th width="40%">Name</th><th>Email</th></tr><tr><td>Mohamed</td>
            <td>abc@gmail.com</td></tr><tr><td>Huan</td><td>something@mail.com</td></tr><tr>
            <td>Mathew</td><td>something@mail.com</td></tr><tr><td>Adnan Niaz</td><td>
            example@gmail.com</td></tr></table></div></div></main></div>
        `);
    });

});
