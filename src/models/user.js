// TODO: Implement an actual hash
function hashPassword(pw) {
    return pw;
}

export default class User {
    constructor({ name, email, username, password, github }) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = hashPassword(password);
        this.github = github;
        this.posts = null;
        this.rounds = null;
    }

    setName(name) {
        return this.name = name;
    }

    setEmail(email) {
        return this.email = email;
    }

    setUsername(username) {
        return this.username = username;
    }

    setPassword(password) {
        return this.password = hashPassword(password);
    }

    setGithub(github) {
        return this.github = github;
    }

}