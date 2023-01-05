export const savedIds = [];

export default class Book {
    constructor(name, author, pageLength, readStatus) {
        (this.name = name),
            (this.author = author),
            (this.pageLength = pageLength);
        this.readStatus = readStatus;
        this.id = this.generateUniqueBookId();
    }

    // Gets called upon object creation
    generateUniqueBookId() {
        let newIdStr = "";
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let i = 0; i < 6; i++) {
            // Generate random number to server as the index accessor
            let index = Math.floor(Math.random() * 10);
            newIdStr += numbers[index];
        }

        // prevents id duplication via recursion of generateUniqueBookId func
        if (savedIds.includes(newIdStr)) {
            return this.generateUniqueBookId();
        } else {
            savedIds.push(newIdStr);
            return newIdStr;
        }
    }

    getId() {
        return this.id;
    }
}
