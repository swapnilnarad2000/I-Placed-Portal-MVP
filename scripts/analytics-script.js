let provider = new firebase.auth.GoogleAuthProvider();

function googleLogin() {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log(result);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}

function logoutUser() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logout ")
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        // User is not signed in.
        window.location = "index.html";
    }
    else {
        document.getElementById("logOut").style.display = "block";
        document.querySelector("nav").style.display = "block";
        document.getElementById("showAfterLog").style.display = "block";
        document.getElementById("logOut").addEventListener("click", function () {
            logoutUser();
            setTimeout(function () {
            }, 2000);
        })
    }
});


function logoutUser() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logout ")
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}




