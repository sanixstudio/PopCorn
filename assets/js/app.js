$(document).ready(function () {
<<<<<<< HEAD
    console.log('hi')
})

ref().set('trains')
=======

    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/550?api_key=f3f124a7e3af05d748ddcefe10f25cb0',
        method: 'GET',
        dataType: 'json'
    }).then(data => {

        console.log(data)

    });
})
>>>>>>> 93414252525be2481a14d29a6bfbbcf20a8aa409
