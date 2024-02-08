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
    setTimeout(function () {
        window.location = "index.html";
    }, 2000);
})

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("login").style.display = "none";
        getData()
        document.getElementById("logOut").style.display = "block";
        document.getElementById("spinner").style.display = "none";
        document.querySelector("nav").style.display = "block";
        document.querySelector(".login-background").style.display = "none";
        document.querySelector(".overlay").style.display = "none";
    }
    document.getElementById("showBeforeLog").style.display = "flex";
});


const blogHtml = (blog, num, roundData) => `
<div class="card border-secondary mb-3">
<div class="card-header bg-primary text-white border-secondary"><b>${blog.company} on campus experience</b></div>
<div class="card-body bg-light">
    <h6 class="card-title text-secondary">Candidate Name: <b>${blog.firstName} ${blog.lastName}</b></h6>
    <p class="card-text text-danger">Topics: ${blog.tags}.</p>
    <p class="card-text text-success">Status : ${blog.status} <br> Difficulty: ${blog.level}.</p>
   <button id ="btn-${num}" type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal-${num}   ">View More</button>
   <div class="modal fade scrollable" id="exampleModal-${num}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel"><b>${blog.company} on campus experience</b></h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <h5>Candidate Name: ${blog.firstName} ${blog.lastName}</h5>
            <b>Batch of: </b>${blog.batch}<br>
            <script>
                for(let k=0;k<roundData.length;k++){
                    roundData[k]
                }
            </script>
            <b>Round Information: <br></b>${roundData}<br>
            <b>Feedback: </b>${blog.feedback}<br>
            <b>Topics: </b>${blog.tags}<br>
            <b>Status : </b>${blog.status} <br>
            <b>Difficulty: </b>${blog.level}<br>
        </div>
        </div >
    </div >
    </div >
</div >
</div >
</div >
    `



function createBlob(blogData, blogNumber) {
    const div = document.createElement('div');
    div.setAttribute("id", "blog_" + blogNumber);
    div.setAttribute("class", "col-lg-4")
    let roundData = []
    let roundCount = Object.keys(blogData.rounds).length
    for (let k = 0; k < roundCount; k++) {
        questionCount = Object.keys(blogData.rounds['round_' + (k + 1)]).length;
        let text = "Round " + (k + 1) + ": " + `<br>`;
        for (let l = 0; l < questionCount; l++) {
            text += blogData.rounds['round_' + (k + 1)]["question_" + (l + 1)]
        }
        roundData.push(text);
        if (k < questionCount - 1)
            roundData.push(`<br>`);
    }
    div.innerHTML = blogHtml(blogData, blogNumber, roundData);
    return div;
}


let datas = []

const getData = () => {
    db.collection("experienceBlog")
    .orderBy("timeStamp", "desc").get().then(qs => {
        qs.forEach(doc => datas.push(doc.data()))
        for (let i = 0; i < datas.length; i++) {
            const ele = document.getElementById('blogs');
            ele.appendChild(createBlob(datas[i], i + 1));
        }
    })
}


