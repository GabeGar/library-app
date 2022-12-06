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
    modal.close();
    resetInputs();
});

// Object(s) list
const myLibrary = [];

function Book(name, author, pageLength, readStatus) {
    (this.name = name ? name : "Unknown Book Title"),
        (this.author = author ? author : "Unknown Author"),
        (this.pageLength =
            pageLength && pageLength > 0 ? pageLength : "Unknown Length"),
        (this.readStatus = readStatus ? "Finished" : "Not Read");
}

function resetInputs() {
    bookName.value = "";
    author.value = "";
    pageLength.value = "";
    readStatus.checked = false;
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

    for (let book of myLibrary) {
        // Creates new entry to be appended to main content.
        const libraryCard = document.createElement("div");
        const cardInfo = document.createElement("div");
        const img = document.createElement("img");

        for (let entry in book) {
            const cardInfoData = document.createElement("div");
            cardInfoData.append(book[entry]);
            cardInfo.appendChild(cardInfoData);
        }
        img.classList.add("card_img");
        img.src = "images/calm_library.jpg";
        img.alt = "Calm library setting with a soft yellow lighting hue.";
        cardInfo.classList.add("card_info");
        libraryCard.classList.add("library_card");
        libraryCard.appendChild(img);
        libraryCard.appendChild(cardInfo);
        mainContent.appendChild(libraryCard);

        // Removes Book Only after book has been displayed.
        // To be stored instead of removed, later on.
        myLibrary.pop(book);
        resetInputs();
    }
}

addBook.addEventListener("click", addBookToLibrary);
