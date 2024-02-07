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

document.getElementById("logOut").addEventListener("click", function () {
    logoutUser();
    setTimeout(function () {
    }, 2000);
})
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
        document.getElementById("form").style.display = "block";
        document.getElementById("logOut").style.display = "block";
        document.querySelector("nav").style.display = "block";
    }
});

let datas = []

document.getElementById("submit").addEventListener("click", function () {
    removeAllChildNodes(document.getElementById('blogs'));
    datas = []
    getData();
});

const blogHtml = (blog, num, roundData) => `
<div class="card border-success mb-3">
<div class="card-header bg-primary text-white border-success"><b>${blog.company} On campus experience</b></div>
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
            <b>Round Information: </b>${roundData}<br>
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
        let text = "Round " + (k + 1) + ": ";
        for (let l = 0; l < questionCount; l++) {
            text += blogData.rounds['round_' + (k + 1)]["question_" + (l + 1)]
        }
        roundData.push(text);
    }
    div.innerHTML = blogHtml(blogData, blogNumber, roundData);
    return div;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


const getData = () => {
    db.collection("experienceBlog").get().then(qs => {
        qs.forEach(doc => datas.push(doc.data()))
        topicTags = [];
        companyTags = [];
        totalTags = document.getElementsByClassName("item").length;
        for (let topics = 0; topics < totalTags; topics++) {
            topicTags.push(document.getElementsByClassName("item")[topics].textContent);
        }
        console.log(topicTags)
        let s = 1;
        for (let i = 0; i < datas.length; i++) {
            let k = datas[i].tags.length;
            for (let j = 0; j < k; j++) {
                let flag = 0;
                // console.log(datas[i].tags[j], datas[i].tags[j] in topicTags)
                for (let l = 0; l < topicTags.length; l++) {
                    if (datas[i].tags[j] == topicTags[l] || datas[i].company == topicTags[l]) {
                        blog = createBlob(datas[i], s++);
                        const ele = document.getElementById('blogs');
                        ele.appendChild(createBlob(datas[i], i + 1));
                        flag = 1;
                        break;
                    }
                }
                if (flag == 1) break;
            }
        }
    })
}


