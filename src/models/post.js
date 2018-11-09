export default class Post {
    constructor({title, body, round, date, id, user}) {
        this.title = title;
        this.body = body;
        this.round = round;
        this.date = date instanceof Date ? date : new Date(date);
        this.id = id;
        this.user = user;
    }
}