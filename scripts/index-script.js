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

document.getElementById("login").addEventListener("click", googleLogin);

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
    setTimeout(function () {
        alert("logged out")
        window.location = "index.html";
    }, 2000);
})

firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        // User is not signed in.
        // googleLogin();
        // document.getElementById("login").style.display = "none";
        document.getElementById("logOut").style.display = "none";

    }
    else {
        document.getElementById("login").style.display = "none";
        getData()
        document.getElementById("logOut").style.display = "block";

    }
});


const blogHtml = (blog) => `
                <div class="card border-success mb-3">
                    <div class="card-header bg-primary text-white border-success"><b>${blog.company} On campus experience</b></div>
                    <div class="card-body bg-light">
                        <h6 class="card-title text-secondary">Candidate Name: <b>${blog.firstName} ${blog.lastName}</b></h6>
                        <p class="card-text text-danger">Topics: ${blog.tags}.</p>
                        <p class="card-text text-success">Status : ${blog.status} <br> Difficulty: ${blog.level}.</p>
                        <button type="submit" id="submit" class="btn btn-secondary  btn-sm">View More</button>
                    </div>
                </div>
`

function createBlob(blogData, blogNumber) {
    const div = document.createElement('div');
    div.setAttribute("id", "blog_" + blogNumber);
    div.setAttribute("class", "col-lg-4")
    div.innerHTML = blogHtml(blogData);
    return div;
}


let datas = []

const getData = () => {
    db.collection("experienceBlog").get().then(qs => {
        qs.forEach(doc => datas.push(doc.data()))
        for (let i = 0; i < datas.length; i++) {
            const ele = document.getElementById('blogs');
            ele.appendChild(createBlob(datas[i], i + 1));
            // console.log(ele.innerHTML)
        }
    })
}

