$(document).ready(function () {



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
        console.log(snap.val().movies);
    });



    // const apiKey;
    const apiKey = "f3f124a7e3af05d748ddcefe10f25cb0";
    const imgDb = "http://image.tmdb.org/t/p/w185/";
    const urlUpcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=${apiKey}`;
    const urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${apiKey}`;
    const urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${apiKey}`;

    let count = 0;

    getUpcomingMovies();
    getPlayingNow();
    getTopRatedMovies();
    getPlayingNowMovieDetails();

    function getUpcomingMovies() {
        $.ajax({
            url: urlUpcomingMovies,
            method: 'GET'
        }).then(function (_data) {
            let results = _data.results;
            for (let element in results) {
                allPosters = results[element].poster_path;
                // console.log(imgDb + allPosters);

                let posterImg = `<div>
                    <img class="img-fluid img-thumbnail" src="${imgDb + allPosters}" alt="">
                    </div>`;
                $('#upcomingMovies').append(posterImg);
            }
        });
    }

    function getPlayingNow() {
        $.ajax({
            url: urlNowPlaying,
            method: 'GET'
        }).then(function (_data) {
            let results = _data.results;
            for (let element in results) {

                allPosters = results[element].poster_path;
                let movieTitle = results[element].original_title;
                let ratings = results[element].vote_average
                // console.log(imgDb + allPosters);

                let posterImg = `<div>
                        <img class="img-fluid img-thumbnail" src="${imgDb + allPosters}" alt="">
                        <div class="text">Hi</div>
                        </div>`;
                $('#playingNow').append(posterImg);


                let detailsContainer = $(`<div class="details-container">
                                        <span>Title: ${movieTitle}</span>
                                        <span>IMDB Rating: ${ratings}</span>
                                        <span>: ${ratings}</span>
                                        <span>Popularity: ${releaseDate}</span>
                                        <span>Popularity: ${synopsis}</span>
                                    </div>`);
                $('.images-container div img').append(detailsContainer);
            }
        });
    }

    function getTopRatedMovies() {
        $.ajax({
            url: urlTopRatedMovies,
            method: 'GET'
        }).then(function (_data) {
            let results = _data.results;
            for (let element in results) {
                allPosters = results[element].poster_path;
                // console.log(imgDb + allPosters);

                let posterImg = `<div>
                        <img class="img-fluid img-thumbnail" src="${imgDb + allPosters}" alt="">
                        </div>`;
                $('#topRated').append(posterImg);
            }
        });
    }

<<<<<<< HEAD

});
=======
});
>>>>>>> dc0bd6440da0f8f642a3eb530e29e7fd77c6b338
