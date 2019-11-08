$(document).ready(function () {

    // code test area ----------------------------------------------------------
    // let clickedBro = [];
    let movieName = "";

    $(document).on('click', '#logoRating', function () {
        // clickedBro.push($(document.querySelector("#logoRating")))
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
    const imgDb = "https://image.tmdb.org/t/p/w185/";
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

            $('#slider').empty();
            $('#each-genre').empty();
            $('#about2-page').empty();
            $('#posters-container').empty();

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

            for (let pages in results) {
                let searchResults = $(`
                    <div class="search-title text-info each-search-result mt-5">
                    <img class="search-img float-left" src="${imgDb + results[pages].poster_path}"></img>
                    <div class="m-title pl-5 movie-title">${results[pages].original_title}</div>
                    <div class="m-title pl-5 movie-popularity">${Math.round(results[pages].popularity)}</div>
                    <div class="m-title pl-5 movie-vote-count"> ${results[pages].vote_count}</div>
                    <div class="m-title pl-5 movie-vote-avg"> ${results[pages].vote_average}</div>
                    <div class="m-title pl-5 movie-release-year"> ${results[pages].release_date}</div>
                    <div class="m-title pl-5 movie-overview">${results[pages].overview}</div>
                    </div>
                `);
                console.log(results[pages])

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
                        <img src="./aeon-favourites-yellow-star-icon-png-clipart.png" alt="" class ="loginstar" id="logoRating">
                        </div>`;
                $(containerId).append(posterImg);
            }
        });
    }

    // Get movies by clicking on genre
    $('.genre-options').on('click', function () {
        let genreId = parseInt(this.getAttribute("data"));

        $('#each-genre').empty();
        $('#slider').empty();
        $('#posters-container').empty();
        $('#about2-page').empty();
        $('.search-result').empty();

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
                    $('#each-genre').append(`<div class="search-title mt-5 text-info each-search-result">
                            <div class="float-left"><img src="${imgDb + each.poster_path}"></div>
                            <div class="m-title pl-5 movie-title">${each.original_title}</div>
                            <div class="m-title pl-5 movie-popularity"><span class= "text-light">Popularity:</span> ${each.popularity}</div>
                            <div class="m-title pl-5 movie-vote-count"><span class= "text-light">Vote Count:</span> ${each.vote_count}</div>
                            <div class="m-title pl-5 movie-vote-avg"><span class= "text-light">Average Vote:</span> ${each.vote_average}</div>
                            <div class="m-title pl-5 movie-release-year"><span class= "text-light">Release Date:</span> ${each.release_date}</div>
                            <div class="m-title pl-5 movie-overview" style="width:50%"><span class= "text-light">Overview:</span> ${each.overview}</div>
                        </div>
                        `);
                }

            }
        });
    }

    // About page
    $('#about').on('click', function () {

        $('#each-genre').empty();
        $('#slider').empty();
        $('#posters-container').empty();
        $('.search-result').empty();

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

    $('.login').on('click', function (e) {
        e.preventDefault();
        console.log('clicked');
        $('#each-genre').hide();
        $('#slider').hide();
        $('#posters-container').hide();
        $('.search-result').hide();
        // $('.btn').hide();

        $('#LoginIn-page').append(`<form id="authlogin>
        <div class="form-group">
        <label for="exampleInputEmail1"></label>
        <input type="username" class="form-control" id="username1" aria-describedby="emailHelp" placeholder="Enter username">
        <small id="emailHelp" class="form-text text-muted"></small>
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="password1" placeholder="Enter Password">
        </div>
        <button type="submit" class="submitbtn m-1 btn-light">Submit</button>
        </form>`)


        $(document).on('click', '.submitbtn', function (e1) {
            e1.preventDefault();
            $('#authlogin').hide();
            $('.justify-content-center').append(`<button type="button" id="logoutbtn" class="login btn m-1 btn-light">Log Out</button>`)
        })
    })

    const auth = firebase.auth()

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('signed in');
            $('#LoginIn-page').hide();
            const logoutB = $('.login').attr('id', 'logoutbtn');
            logoutB.text('Logout');
            $('#logoutbtn').append(logoutB);

            $('#each-genre').show();
            $('#slider').show();
            $('#posters-container').show();
            $('.search-result').show();

        } else {
            console.log('signed out');
            $('#authlogin').show();
            $('#logoutbtn').empty();
            $('#each-genre').show();
            $('#slider').show();
            $('#posters-container').show();
            $('.search-result').show();
        }
    });

    $(document).on('click', '#logoutbtn', function () {
        auth.signOut();
    })

    $('#loginbtn').on('click', function (e) {
        e.preventDefault();
        const email = $('#username1').val();
        const pw = $('#password1').val();
        auth.signInWithEmailAndPassword(email, pw);
    })

    document.onkeyup = e => {
        if (e.key === 'Enter') {
            auth.signInWithEmailAndPassword('projectcamp1@gmail.com', '123Qwerty!');
        } else if (e.key === 'Escape') {
            auth.signOut();
        }
    }
});