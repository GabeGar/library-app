import Book, { savedIds } from "./modules/book";
import LibraryManager from "./modules/librarymanager";
import DisplayManager from "./modules/displayhandler";

// Initialized manager object(s)
const libraryManager = new LibraryManager();
const displayManager = new DisplayManager();

// Form input and button queries
const bookName = document.querySelector("#bookname");
const author = document.querySelector("#author");
const pageLength = document.querySelector("#pages");
const readStatus = document.querySelector("#read");
const addBook = document.querySelector(".add_book");

// Modal queries
const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open_modal");
const closeModal = document.querySelector(".close_modal");

// Helper
function resetInputs() {
    bookName.value = "";
    author.value = "";
    pageLength.value = "";
    readStatus.checked = false;
}

// Helper
function removeSavedIdFromList(savedIdsList, targetId) {
    for (let id of savedIdsList) {
        if (targetId === id) {
            let index = savedIdsList.indexOf(targetId);
            savedIdsList.splice(index, 1);
        }
    }
}

function attachDeleteBtnListeners() {
    // Returns reference to delete btns on library cards, once created from displayManager
    const allDeleteButtons = displayManager.getDeleteBtnQueries();

    // Add event listeners for deleting library cards to each btn
    allDeleteButtons.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", removeBookFromLibraryAndRender);
    });
}

// Main function for removing books
function removeBookFromLibraryAndRender(e) {
    let currentTargetId = e.target.parentNode.parentNode.id;
    removeSavedIdFromList(savedIds, currentTargetId);
    console.log(savedIds);
    displayManager.removeBookFromDisplay(currentTargetId);
    libraryManager.removeBookFromLibrary(currentTargetId);
    displayManager.renderBooks(libraryManager.getLibraryBooks());
    attachDeleteBtnListeners();
}

// Main function for creating/displaying books
function addBookToLibraryAndRender(e) {
    if (bookName.value === "" || author.value === "" || pageLength.value === "")
        return;

    const newBook = new Book(
        bookName.value,
        author.value,
        pageLength.value,
        readStatus.checked ? "Read" : "Unread"
    );

    libraryManager.addBookToLibraryList(newBook);
    const myLibrary = libraryManager.getLibraryBooks();
    displayManager.renderBooks(myLibrary);
    attachDeleteBtnListeners();
    console.log(savedIds);
}

// Event listeners
openModal.addEventListener("click", () => {
    resetInputs();
    modal.showModal();
});

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    resetInputs();
    modal.close();
});

modal.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        resetInputs();
        modal.close();
    }
});

addBook.addEventListener("click", addBookToLibraryAndRender);
