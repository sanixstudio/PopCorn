    let apiKey = "f3f124a7e3af05d748ddcefe10f25cb0";
    let imgDb = "http://image.tmdb.org/t/p/w185/";
    let urlUpcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=${apiKey}`;
    let urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${apiKey}`;
    let urlTopRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${apiKey}`;

    getMoviesData(urlNowPlaying, $('#playingNow'));
    getMoviesData(urlUpcomingMovies, $('#upcomingMovies'));
    getMoviesData(urlTopRatedMovies, $('#topRated'));