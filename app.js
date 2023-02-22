function parsePost(post, mainPage = false) {
    post.content = post.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const converter = new showdown.Converter();
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");
    const postTitle = document.createElement("h2");
    postTitle.classList.add("post-title");
    postTitle.innerText = `${post.title}`;
    const postDate = document.createElement("p");
    postDate.classList.add("post-date");
    postDate.innerText = `posted at: ${post.created_at}`;
    const postContent = document.createElement("p");
    postContent.classList.add("post-content");
    postContent.innerHTML = converter.makeHtml(post.content);
    postContainer.appendChild(postTitle);
    postContainer.appendChild(postContent);
    postContainer.appendChild(postDate);
    if (!mainPage) {
        const aContainer = document.createElement("a");
        aContainer.href = `${document.location.href}?id=${post.id}`;
        aContainer.classList.add("a-container");
        aContainer.appendChild(postContainer);
        return aContainer;
    } else {
        return postContainer;    
    }
}
    


window.addEventListener("load", function () {
    const mainContainer = document.getElementById("main-container");
    const BLOG_URL = "https://blog.scorchchamp.com/posts";
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        fetch(BLOG_URL)
            .then (response => response.json())
            .then (data => {
                const post = data.find(post => post.id == id);
                console.log(id)
                mainContainer.appendChild(parsePost(post, true));
            });
        return;
    }
    fetch(BLOG_URL)
        .then (response => response.json())
        .then (data => {
            data.forEach (post => {
                mainContainer.appendChild(parsePost(post));
            });
        });
});