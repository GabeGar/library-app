/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_book__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/book */ \"./src/modules/book.js\");\n/* harmony import */ var _modules_librarymanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/librarymanager */ \"./src/modules/librarymanager.js\");\n/* harmony import */ var _modules_displayhandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/displayhandler */ \"./src/modules/displayhandler.js\");\n\n\n\n\n// Initialized manager object(s)\nconst libraryManager = new _modules_librarymanager__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nconst displayManager = new _modules_displayhandler__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n// Form input and button queries\nconst bookName = document.querySelector(\"#bookname\");\nconst author = document.querySelector(\"#author\");\nconst pageLength = document.querySelector(\"#pages\");\nconst readStatus = document.querySelector(\"#read\");\nconst addBook = document.querySelector(\".add_book\");\n\n// Modal queries\nconst modal = document.querySelector(\".modal\");\nconst openModal = document.querySelector(\".open_modal\");\nconst closeModal = document.querySelector(\".close_modal\");\n\n// Helper Funcs\nfunction resetInputs() {\n    bookName.value = \"\";\n    author.value = \"\";\n    pageLength.value = \"\";\n    readStatus.checked = false;\n}\n\nfunction attachDeleteBtnListeners() {\n    // Returns reference to delete btns on library cards, once created from displayManager\n    const allDeleteButtons = displayManager.getDeleteBtnQueries();\n\n    // Add event listeners for deleting library cards to each btn\n    allDeleteButtons.forEach((deleteBtn) => {\n        deleteBtn.addEventListener(\"click\", removeBookFromLibraryAndRender);\n    });\n}\n\n// Main function for removing books\nfunction removeBookFromLibraryAndRender(e) {\n    let currentTargetId = e.target.parentNode.parentNode.id;\n    displayManager.removeBookFromDisplay(currentTargetId);\n    libraryManager.removeBookFromLibrary(currentTargetId);\n    displayManager.renderBooks(libraryManager.getLibraryBooks());\n    attachDeleteBtnListeners();\n}\n\n// Main function for creating/displaying books\nfunction addBookToLibraryAndRender(e) {\n    if (bookName.value === \"\" || author.value === \"\" || pageLength.value === \"\")\n        return;\n\n    const newBook = new _modules_book__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        bookName.value,\n        author.value,\n        pageLength.value,\n        readStatus.checked ? \"Read\" : \"Unread\"\n    );\n\n    libraryManager.addBookToLibraryList(newBook);\n    const myLibrary = libraryManager.getLibraryBooks();\n    displayManager.renderBooks(myLibrary);\n    attachDeleteBtnListeners();\n}\n\n// Event listeners\nopenModal.addEventListener(\"click\", () => {\n    resetInputs();\n    modal.showModal();\n});\n\ncloseModal.addEventListener(\"click\", (e) => {\n    e.preventDefault();\n    resetInputs();\n    modal.close();\n});\n\nmodal.addEventListener(\"keydown\", (e) => {\n    if (e.code === \"Escape\") {\n        resetInputs();\n        modal.close();\n    }\n});\n\naddBook.addEventListener(\"click\", addBookToLibraryAndRender);\n\n\n//# sourceURL=webpack://library-app/./src/index.js?");

/***/ }),

/***/ "./src/modules/book.js":
/*!*****************************!*\
  !*** ./src/modules/book.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Book)\n/* harmony export */ });\nconst savedIds = [];\n\nclass Book {\n    constructor(name, author, pageLength, readStatus) {\n        (this.name = name),\n            (this.author = author),\n            (this.pageLength = pageLength);\n        this.readStatus = readStatus;\n        this.id = this.generateUniqueBookId();\n    }\n\n    // Gets called upon object creation\n    generateUniqueBookId() {\n        let newIdStr = \"\";\n        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];\n\n        for (let i = 0; i < 6; i++) {\n            // Generate random number to server as the index accessor\n            let index = Math.floor(Math.random() * 10);\n            newIdStr += numbers[index];\n        }\n\n        // prevents id duplication via recursion of generateUniqueBookId func\n        if (savedIds.includes(newIdStr)) {\n            return this.generateUniqueBookId();\n        } else {\n            savedIds.push(newIdStr);\n            return newIdStr;\n        }\n    }\n\n    getId() {\n        return this.id;\n    }\n}\n\n\n//# sourceURL=webpack://library-app/./src/modules/book.js?");

/***/ }),

/***/ "./src/modules/displayhandler.js":
/*!***************************************!*\
  !*** ./src/modules/displayhandler.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DisplayManager)\n/* harmony export */ });\nconst mainContent = document.querySelector(\".main_content_wrapper\");\n\nclass DisplayManager {\n    renderBooks(currLibrary) {\n        // Re-render all books upon new entry being added to list and display\n        mainContent.textContent = \"\";\n\n        for (let book of currLibrary) {\n            // Creates and Displays new entry to be appended to main content.\n            const libraryCard = document.createElement(\"div\");\n            const cardInfo = document.createElement(\"div\");\n            const img = document.createElement(\"img\");\n            const deleteBtn = document.createElement(\"button\");\n\n            let currentBookId = book.getId();\n\n            for (let entry in book) {\n                // Prevents id entry from being appended to the cardInfoData div.\n                if (entry === \"id\") continue;\n\n                let formatTitle = \"\";\n                const cardInfoData = document.createElement(\"div\");\n                if (entry === \"name\") formatTitle = \"Title:\";\n                if (entry === \"author\") formatTitle = \"Author:\";\n                if (entry === \"pageLength\") formatTitle = \"Pages:\";\n                if (entry === \"readStatus\") formatTitle = \"Status:\";\n                // Formatting\n                cardInfoData.append(`${formatTitle} ${book[entry]}`);\n                cardInfo.style.padding = \"0.3rem\";\n                cardInfo.style.textAlign = \"center\";\n                cardInfo.style.overflow = \"hidden\";\n                cardInfo.appendChild(cardInfoData);\n            }\n            deleteBtn.textContent = \"X\";\n            deleteBtn.setAttribute(\n                \"style\",\n                \"font-size: 1rem; font-weight: bold; padding: 0.3rem; border-radius: 5px; color: #fff; background-color:#ffac71;\"\n            );\n            deleteBtn.classList.add(\"delete_btn\");\n            deleteBtn.setAttribute(\"id\", `${currentBookId}`);\n            cardInfo.appendChild(deleteBtn);\n\n            img.classList.add(\"card_img\");\n            img.src = \"images/calm_library.jpg\";\n            img.alt = \"Calm library setting with a soft yellow lighting hue.\";\n\n            cardInfo.classList.add(\"card_info\");\n            libraryCard.classList.add(\"library_card\");\n            libraryCard.id = currentBookId;\n\n            // Finalizes addition of latest book\n            libraryCard.appendChild(img);\n            libraryCard.appendChild(cardInfo);\n            mainContent.appendChild(libraryCard);\n        }\n    }\n\n    removeBookFromDisplay(targetId) {\n        for (let child of mainContent.children) {\n            if (child.id === targetId) {\n                mainContent.removeChild(child);\n                // Need a way to remove book from list\n            }\n        }\n    }\n\n    getDeleteBtnQueries() {\n        const allDeleteButtons = document.querySelectorAll(\".delete_btn\");\n        return allDeleteButtons;\n    }\n}\n\n\n//# sourceURL=webpack://library-app/./src/modules/displayhandler.js?");

/***/ }),

/***/ "./src/modules/librarymanager.js":
/*!***************************************!*\
  !*** ./src/modules/librarymanager.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LibraryManager)\n/* harmony export */ });\nclass LibraryManager {\n    constructor() {\n        this.myLibrary = [];\n    }\n\n    getLibraryBooks() {\n        return this.myLibrary;\n    }\n\n    addBookToLibraryList(bookObj) {\n        return this.myLibrary.push(bookObj);\n    }\n\n    removeBookFromLibrary(bookId) {\n        for (let bookObj of this.myLibrary) {\n            let currentId = bookObj.getId();\n\n            if (currentId === bookId) {\n                let index = this.myLibrary.indexOf(bookObj);\n                this.myLibrary.splice(index, 1);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://library-app/./src/modules/librarymanager.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;