export default class LibraryManager {
    constructor() {
        this.myLibrary = [];
    }

    getLibraryBooks() {
        return this.myLibrary;
    }

    addBookToLibraryList(bookObj) {
        return this.myLibrary.push(bookObj);
    }

    removeBookFromLibrary(bookId) {
        for (let bookObj of this.myLibrary) {
            let currentId = bookObj.getId();

            if (currentId === bookId) {
                let index = this.myLibrary.indexOf(bookObj);
                this.myLibrary.splice(index, 1);
            }
        }
    }
}
