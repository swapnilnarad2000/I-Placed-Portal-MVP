let provider = new firebase.auth.GoogleAuthProvider();

function googleLogin() {
    document.getElementById("spinner").style.display = "block";
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

document.getElementById("login").addEventListener("click", function () {
    googleLogin();
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("logOut").style.display = "block";
    document.getElementById("notlogin").style.display = "none";
    document.getElementById("logon").style.display = "block";
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

document.getElementById("logOut").addEventListener("click", function () {
    logoutUser();
    document.getElementsByClassName("logout-overlay")[0].style.display = "block";
    setTimeout(function () {
        document.getElementsByClassName("logout-overlay")[0].style.display = "none";
        window.location = "index.html";
    }, 2000);
})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("logOut").style.display = "block";
        document.getElementById("notlogin").style.display = "none";
        document.getElementById("logon").style.display = "block";
    }
});




