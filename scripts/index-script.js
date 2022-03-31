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

getData()

