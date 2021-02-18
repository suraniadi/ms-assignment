import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Posts");
    this.posts = [];
  }

  postToView(post) {
    return `
      <div class = "post-container">
        <div class = "post-title">${post.title}</div>
        <div class = "post-body-container">
          <p class = "post-body"> ${post.body} </p>
          <div class = "comments-container">
            <a href="/posts/${post.id}" class = "post-comments" data-link>
                  ${post.numberOfComments} Comments
              </a>
              <div class = "comments-line">
              </div>
          </div>
        </div> 
      </div>
    `;
  }

  async getNumberOfComments(id) {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const comments = await res.json();
      return comments.length;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchData() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const posts = await res.json();
      return posts;
    } catch (err) {
      console.log(err);
    }
  }

  async getHtml() {
    let posts = await this.fetchData();

    posts = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        numberOfComments: await this.getNumberOfComments(post.id),
      }))
    );

    let postsLength = posts.length;

    posts = posts.map((post) => this.postToView(post)).join("");

    return `  
        <div class="container">

          <div class = "posts-title">Posts</div>

          <div class = "header-line"> </div>

          <p class = "annotation"> ${postsLength} Posts Displayed </p>

          <div class = "posts-container"> 
            ${posts}
          </div>
        </div>
    `;
  }
}
