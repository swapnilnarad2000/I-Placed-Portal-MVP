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
            document.getElementsByClassName("logout-overlay")[0].style.display = "block";
            setTimeout(function () {
                document.getElementsByClassName("logout-overlay")[0].style.display = "none";
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


var trace1 = {
    x: ["DSA", "Linked List", "Arrays", "DP", "DSA1", "Linked List1", "Arrays1", "DP1", "DSA2", "Linked List2", "Arrays2", "DP2"],
    y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17],
    type: 'scatter'
};


var data = [trace1];

Plotly.newPlot(document.getElementById('plot-1'), data);

var data = [{
    x: ['Paytm', 'LTI', 'Redisys', "Amazon", "ICICI Bank"],
    y: [21, 6, 8, 2, 8],
    type: 'bar'
}];

Plotly.newPlot(document.getElementById('plot-2'), data);

var data = [{
    x: ['Paytm', 'LTI', 'Redisys', "Amazon", "ICICI Bank"],
    y: [8.7, 7.6, 8.1, 9.2, 7.2],
    type: 'bar'
}];


Plotly.newPlot(document.getElementById('plot-3'), data);

var data = [{
    values: [19, 55, 27],
    labels: ['Easy', 'Medium', 'Hard'],
    type: 'pie'
}];

var layout = {
    height: 350,
    width: 500
};

Plotly.newPlot(document.getElementById('plot-4'), data, layout);



