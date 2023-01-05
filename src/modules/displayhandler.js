const mainContent = document.querySelector(".main_content_wrapper");

export default class DisplayManager {
    renderBooks(currLibrary) {
        // Re-render all books upon new entry being added to list and display
        mainContent.textContent = "";

        for (let book of currLibrary) {
            // Creates and Displays new entry to be appended to main content.
            const libraryCard = document.createElement("div");
            const cardInfo = document.createElement("div");
            const img = document.createElement("img");
            const deleteBtn = document.createElement("button");

            let currentBookId = book.getId();

            for (let entry in book) {
                // Prevents id entry from being appended to the cardInfoData div.
                if (entry === "id") continue;

                let formatTitle = "";
                const cardInfoData = document.createElement("div");
                if (entry === "name") formatTitle = "Title:";
                if (entry === "author") formatTitle = "Author:";
                if (entry === "pageLength") formatTitle = "Pages:";
                if (entry === "readStatus") formatTitle = "Status:";
                // Formatting
                cardInfoData.append(`${formatTitle} ${book[entry]}`);
                cardInfo.style.padding = "0.3rem";
                cardInfo.style.textAlign = "center";
                cardInfo.style.overflow = "hidden";
                cardInfo.appendChild(cardInfoData);
            }
            deleteBtn.textContent = "X";
            deleteBtn.setAttribute(
                "style",
                "font-size: 1rem; font-weight: bold; padding: 0.3rem; border-radius: 5px; color: #fff; background-color:#ffac71;"
            );
            deleteBtn.classList.add("delete_btn");
            deleteBtn.setAttribute("id", `${currentBookId}`);
            cardInfo.appendChild(deleteBtn);

            img.classList.add("card_img");
            img.src = "./dist/images/calm_library.jpg";
            img.alt = "Calm library setting with a soft yellow lighting hue.";

            cardInfo.classList.add("card_info");
            libraryCard.classList.add("library_card");
            libraryCard.id = currentBookId;

            // Finalizes addition of latest book
            libraryCard.appendChild(img);
            libraryCard.appendChild(cardInfo);
            mainContent.appendChild(libraryCard);
        }
    }

    removeBookFromDisplay(targetId) {
        for (let child of mainContent.children) {
            if (child.id === targetId) {
                mainContent.removeChild(child);
                // Need a way to remove book from list
            }
        }
    }

    getDeleteBtnQueries() {
        const allDeleteButtons = document.querySelectorAll(".delete_btn");
        return allDeleteButtons;
    }
}
