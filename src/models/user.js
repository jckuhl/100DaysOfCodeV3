export default class User {
    constructor({ name, email, username }) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.posts = null;
        this.rounds = null;
        this.friends = [];
        this.options = {
            sharing: false,
            twitter: null,
            github: null
        }
    }
}