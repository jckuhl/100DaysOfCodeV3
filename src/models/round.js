export default class Round {
    constructor({ num, date, selected, id}) {
        this.num = num;
        this.date = date instanceof Date ? date : new Date(date);
        this.selected = selected;
        this.id = id;
    }
}