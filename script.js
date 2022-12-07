// Accessible queries
const bookName = document.querySelector("#bookname");
const author = document.querySelector("#author");
const pageLength = document.querySelector("#pages");
const readStatus = document.querySelector("#read");
const addBook = document.querySelector(".add_book");
const mainContent = document.querySelector(".main_content_wrapper");

// Modal Control
const modal = document.querySelector(".modal");
const openModal = document.querySelector(".open_modal");
const closeModal = document.querySelector(".close_modal");

openModal.addEventListener("click", () => {
    modal.showModal();
});

closeModal.addEventListener("click", () => {
    resetInputs();
    modal.close();
});

modal.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        resetInputs();
        modal.close();
    }
});

// Object(s) list(s)
const myLibrary = [];
const idStorage = [];

// Book ID start and increment from Global
let bookId = 0;

function Book(name, author, pageLength, readStatus) {
    (this.name = name ? name : "Unknown Book Title"),
        (this.author = author ? author : "Unknown Author"),
        (this.pageLength =
            pageLength && pageLength > 0 ? pageLength : "Unknown Length"),
        (this.readStatus = readStatus ? "Finished" : "Not Read");
    this.id = ++bookId;
}

function resetInputs() {
    bookName.value = "";
    author.value = "";
    pageLength.value = "";
    readStatus.checked = false;
}

function AddBookToDisplay() {
    for (let book of myLibrary) {
        // Creates and Displays new entry to be appended to main content.
        const libraryCard = document.createElement("div");
        const cardInfo = document.createElement("div");
        const img = document.createElement("img");
        const deleteBtn = document.createElement("button");

        for (let entry in book) {
            // Prevents id entry from being appended to the cardInfoData divs.
            if (entry === "id") continue;

            let format = "";
            const cardInfoData = document.createElement("div");
            if (entry === "name") format = "Title:";
            if (entry === "author") format = "Author:";
            if (entry === "pageLength") format = "Pages:";
            if (entry === "readStatus") format = "Status:";
            // Formatting
            cardInfoData.append(`${format} ${book[entry]}`);
            cardInfo.appendChild(cardInfoData);
        }
        deleteBtn.textContent = "Remove Book";
        deleteBtn.setAttribute(
            "style",
            "padding: 0.3rem; border-radius: 5px; color: #fff; background-color:#ffac71;"
        );
        deleteBtn.setAttribute("id", `${bookId}`);
        cardInfo.appendChild(deleteBtn);

        // Attaches Event Listener to deleteBtn dynamically
        deleteBtn.addEventListener("click", (e) => {
            for (let child of mainContent.children) {
                if (e.target.id === child.getAttribute("id")) {
                    mainContent.removeChild(child);
                }
            }
        });

        img.classList.add("card_img");
        img.src = "images/calm_library.jpg";
        img.alt = "Calm library setting with a soft yellow lighting hue.";

        cardInfo.classList.add("card_info");
        libraryCard.classList.add("library_card");
        libraryCard.setAttribute("id", `${bookId}`);

        // Finalizes addition of latest book
        libraryCard.appendChild(img);
        libraryCard.appendChild(cardInfo);
        mainContent.appendChild(libraryCard);

        // Sends Book to idStorage Arr, Only after book has been displayed.
        // To be stored instead of removed, later on.
        idStorage.push(myLibrary.pop(book));
        // Clears Input Fields
        resetInputs();
    }
}

function addBookToLibrary(e) {
    e.preventDefault();

    const newBook = new Book(
        bookName.value,
        author.value,
        pageLength.value,
        readStatus.checked
    );
    myLibrary.push(newBook);
    AddBookToDisplay();
}

addBook.addEventListener("click", addBookToLibrary);
