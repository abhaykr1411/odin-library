const myLibrary = [];
const addBookButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector(".modal-close");
const modal = document.querySelector("[data-modal]");
const main = document.querySelector("main");
//form elements
const formDOM = document.getElementById("form");
const titleDOM = document.getElementById("title");
const authorDOM = document.getElementById("author");
const pagesDOM = document.getElementById("pages");
const yearDOM = document.getElementById("year");
const isReadDOM = document.getElementById("read");

formDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.submitter.classList.contains("modal-close")) return;
  let validInput = validateInput();
  if (validInput) {
    formDOM.reset();
    formDOM.querySelectorAll(".input-control").forEach((element) => {
      const errorDisplay = element.querySelector(".error");
      errorDisplay.innerText = "";
      element.classList.remove("error");
      element.classList.remove("success");
    });
    modal.close();
  }
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInput = () => {
  const titleVal = titleDOM.value.trim();
  const authorval = authorDOM.value.trim();
  const pagesVal = pagesDOM.value.trim();
  const yearVal = yearDOM.value.trim();
  const readVal = isReadDOM.checked;

  if (titleVal === "") {
    setError(titleDOM, "title is required!");
    return false;
  } else {
    setSuccess(titleDOM);
  }
  if (authorval === "") {
    setError(authorDOM, "Author name is required!");
    return false;
  } else {
    setSuccess(authorDOM);
  }
  if (pagesVal === "") {
    setError(pagesDOM, "Number of pages is required!");
    return false;
  } else {
    setSuccess(pagesDOM);
  }
  if (yearVal === "") {
    setError(yearDOM, "Year of publication is required!");
    return false;
  } else {
    setSuccess(yearDOM);
  }
  addBookToLibrary(titleVal, authorval, pagesVal, yearVal, readVal);
  console.log(myLibrary);
  return true;
};

addBookButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

function Book(BookID, title, author, pages, year, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.BookID = BookID;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.year = year;
  this.isRead = isRead;

  this.info = function () {
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${
        isRead ? "read already" : "not read yet"
      }`
    );
  };
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, year, isRead) {
  const bookID = crypto.randomUUID();
  const bookCreated = new Book(bookID, title, author, pages, year, isRead);
  myLibrary.push(bookCreated);
  displayBook(bookCreated);
}

function displayBook(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", book.BookID);
  card.innerHTML = `
    <div class="title center-align">${book.title}</div>
    <div class="left-align">
      <div class="author-container">
        Author: <span class="author">${book.author}</span>
      </div>
      <div class="pages-container">
        Pages: <span class="pages">${book.pages}</span><br />
      </div>
      <div class="year-container">
        Year: <span class="year">${book.year}</span>
      </div>
    </div>
    <div class="right-align">
      <input type="checkbox" name="read" id="isRead" ${
        book.isRead ? "checked='checked'" : ""
      }/>
      <button class="delete-btn">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                />
              </svg>
      </button>
    </div>
  `;
  main.insertBefore(card, addBookButton);
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".delete-btn")) {
    const card = e.target.closest(".card");
    if (card) {
      const bookObj = myLibrary.find((book) => book.BookID == card.dataset.id);
      const index = myLibrary.indexOf(bookObj);
      myLibrary.splice(index, 1);
      card.remove();
    }
  }
});

document.addEventListener("change", (e) => {
  if (e.target.matches("#isRead")) {
    const card = e.target.closest(".card");
    const bookObj = myLibrary.find((book) => book.BookID == card.dataset.id);
    const index = myLibrary.indexOf(bookObj);
    myLibrary[index].toggleRead();
    console.log(myLibrary);
  }
});
