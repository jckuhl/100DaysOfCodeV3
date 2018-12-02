export default class Post {
    constructor({title, body, round, date, id, user}) {
        this.title = title;
        this.body = body;
        this.round = round;
        this.date = date instanceof Date ? date : new Date(date);
        this.id = id;
        this.user = user;
        this.comments = [];
        this.likes = 0;
    }

    /**
     * Adds a comment object to a post.
     *
     * @param {Comment} comment
     * @memberof Post
     */
    newComment(comment) {
        this.comments.push(comment);
    }
}