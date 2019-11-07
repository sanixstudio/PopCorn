$(document).ready(function () {

    $(document).on('click', '#logoRating', function () {

        // clickedBro.push($(document.querySelector("#logoRating")))
        // console.log($(document.querySelector("#logoRating")))


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
        const auth = firebase.auth()







        auth.onAuthStateChanged(user => {
            if (user) {
                console.log('signed in');
                $('#login').hide();
                const logoutB = $('<button>').attr('id', 'logout');
                logoutB.text('Logout');
                $('.logoutButton').append(logoutB);

            } else {
                console.log('signed out');
                $('#login').show();
                $('.logoutButton').empty();
            }
        });

    });

});