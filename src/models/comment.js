export default class Comment {
    constructor({ id, message, author, date }) {
        this.id = id;
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
        if(comment === '') {
            return;
        }
        this.replies.push(comment);
    }

    // JFC ES LINT, DO YOU UNDERSTAND WHAT TODO MEANS?
    // eslint-disable-next-line
    like(user) {
        // TODO: user can only like once, or remove his like.
        this.likes += 1;
    }
}