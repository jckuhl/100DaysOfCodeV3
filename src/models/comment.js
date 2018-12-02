export default class Comment {
    constructor({ message, author, date }) {
        this.message = message;
        this.author = author;
        this.date = date;
        this.likes = 0;
        this.replies = [];
    }

    /**
     * Adds a reply to a comment.  Comment replies are not nested.
     *
     * @param {String} comment
     * @memberof Comment
     */
    addReply(comment) {
        this.replies.push(comment);
    }

    like(user) {
        this.likes += 1;
    }
}