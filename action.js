const myLibrary = [];
const addBookButton = document.querySelector("[data-open-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");

addBookButton.addEventListener("click", () =>{
    modal.showModal();
});

closeButton.addEventListener("click", () =>{
    modal.close();
});

function Book(BookID, title, author, pages, isRead)
{
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor.");
    }
    this.BookID = BookID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function(){
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${(isRead)? "read already": "not read yet"}`);
    };
}

function addBookToLibrary(title, author, pages, isRead){
    const bookID = crypto.randomUUID();
    const bookCreated = new Book(bookID, title, author, pages, isRead);
    myLibrary.push(bookCreated);
}
addBookToLibrary("the hobbit", "JK", 256, true);
console.log(myLibrary);
