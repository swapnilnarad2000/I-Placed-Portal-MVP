let datas = []

document.getElementById("submit").addEventListener("click", function () {
    removeAllChildNodes(document.getElementById('blogs'));
    datas = []
    getData();
});

const blogHtml = (blog) => `
                <div class="card border-success mb-3">
                    <div class="card-header bg-primary text-white border-success"><b>${blog.company} On campus experience</b></div>
                    <div class="card-body bg-light">
                        <h6 class="card-title text-secondary">Candidate Name: <b>${blog.firstName} ${blog.lastName}</b></h6>
                        <p class="card-text text-danger">Topics: ${blog.tags}.</p>
                        <p class="card-text text-success">Status : ${blog.status} <br> Difficulty: ${blog.level}.</p>
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

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


const getData = () => {
    db.collection("experienceBlog").get().then(qs => {
        qs.forEach(doc => datas.push(doc.data()))
        topicTags = [];
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
                    if (datas[i].tags[j] == topicTags[l]) {
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


