const myLibrary = [];
const addBookButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector(".modal-close");
const modal = document.querySelector("[data-modal]");

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
  addBookToLibrary(titleVal, authorval, pagesVal, readVal);
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

function addBookToLibrary(title, author, pages, year, isRead) {
  const bookID = crypto.randomUUID();
  const bookCreated = new Book(bookID, title, author, pages, year, isRead);
  myLibrary.push(bookCreated);
}
