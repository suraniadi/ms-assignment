import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Post View");
  }

  commentToView(comment) {
    return `
      <div class = "v-comment-container">
        <div class = "vertical-line"> </div>
        <div class = "v-content-container"> 
            <div class = "v-comment-header">
                <div class = "v-comment-title">${comment.name}</div>
                <p class = "v-comment-email" > ${comment.email} </p>
            </div>
            <p class = "v-content-body"> ${comment.body} </p>
        </div>
      </div>
    `;
  }

  async fetchData(id) {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const post = await res.json();
      return post;
    } catch (err) {
      console.log(err);
    }
  }

  async fetchComments(id) {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const post = await res.json();
      return post;
    } catch (err) {
      console.log(err);
    }
  }

  async getHtml() {
    console.log(this.params.id);
    let post = await this.fetchData(this.params.id);
    let comments = await this.fetchComments(this.params.id);
    let commentsLength = comments.length;

    console.log(post);

    comments = comments.map((comment) => this.commentToView(comment)).join("");

    return `   
        <div class="v-post-container">

          <div class = "v-post-title">${post.title}</div>

          <div class = "header-line"> </div>

          <div class = "v-post-body"> ${post.body} </div>

          <div class = "v-comments-header"> Comments(${commentsLength}) </div>

          <div class = "v-comments-container"> 
            ${comments}
          </div>
        </div>

    `;
  }
}
