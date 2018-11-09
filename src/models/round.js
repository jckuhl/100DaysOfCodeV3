export default class Round {
    constructor({ num, date, selected, id, user}) {
        this.num = num;
        this.date = date instanceof Date ? date : new Date(date);
        this.selected = selected;
        this.id = id;
        this.user = user;
    }
}