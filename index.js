/* eslint-disable object-shorthand */
const booksListDisplay = document.getElementById('book-list');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const spanMessage = document.getElementById('message');

let bookLists = [];
class Books {
  static addBook(title, author) {
    if (Books.isEmptyField(title, author)) {
      Books.showErrorMesssage('Please fill in both the title and an auhtor fields.');
      return;
    }

    if (Books.isDuplicate(title, author)) {
      Books.showErrorMesssage('This book is already exist in the book list.');
      return;
    }
    // Generate new unique ID for book
    const id = Books.counterAutoIncreatmentId();
    // Add book to collection
    bookLists.push({ id: id, title: title, author: author });

    // Save books to local storage
    Books.saveBooks();

    // Clear input fields
    Books.clearInputFields();
    // Display success message
    Books.showsuccessMessage('Book added successfully!');
    // Display book in list
    Books.renderBooks(id, title, author);
  }

  static isEmptyField(title, author) {
    return !title || !author;
  }

  static isDuplicate(title, author) {
    return bookLists.some((book) => book.title === title && book.author === author);
  }

  static removeBook(id) {
    // Remove book from collection
    bookLists = bookLists.filter((book) => book.id !== id);
    // Save books to local storage
    Books.saveBooks();
    // Remove book from the list
    const bookElement = document.getElementById(`book-${id}`);
    if (bookElement) {
      bookElement.remove();
    }
    // Display success message
    Books.showsuccessMessage('Book removed successfully!');
  }

  static renderBooks(id, title, author) {
    // Create list of awesome book
    const bookElement = document.createElement('li');
    bookElement.setAttribute('id', `book-${id}`);
    bookElement.textContent = `"${title}" by ${author}`;
    // Create remove button for book
    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'remove-btn');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      Books.removeBook(id);
      Books.showsuccessMessage('Book removed successfully!');
    });
    bookElement.appendChild(removeButton);
    // Add book to list
    booksListDisplay.appendChild(bookElement);
  }

  static counterAutoIncreatmentId() {
    if (bookLists.length === 0) {
      return 1;
    }
    return bookLists[bookLists.length - 1].id + 1;
  }

  static clearInputFields() {
    bookTitle.value = '';
    bookAuthor.value = '';
  }

  static saveBooks() {
    localStorage.setItem('bookLists', JSON.stringify(bookLists));
  }

  static loadBooks() {
    const booksJson = localStorage.getItem('bookLists');
    return booksJson ? JSON.parse(booksJson) : [];
  }

  static showsuccessMessage(message) {
    spanMessage.classList.add('success');
    spanMessage.classList.remove('error');
    spanMessage.textContent = message;
    spanMessage.style.display = 'block';
    bookTitle.style.border = '1px solid green';
    bookAuthor.style.border = '1px solid green';
    setTimeout(() => {
      spanMessage.style.display = 'none';
      bookTitle.style.border = '';
      bookAuthor.style.border = '';
      Books.clearInputFields();
    }, 2000);// hide the success message after 2 seconds
  }

  static showErrorMesssage(message) {
    spanMessage.classList.add('error');
    spanMessage.classList.remove('success');
    spanMessage.textContent = message;
    spanMessage.style.display = 'block';
    bookTitle.style.border = '1px solid red';
    bookAuthor.style.border = '1px solid red';
    setTimeout(() => {
      spanMessage.style.display = 'none';
      bookTitle.style.border = '';
      bookAuthor.style.border = '';
      Books.clearInputFields();
    }, 2000);// hide the success message after 2 seconds
  }
}

// Add event listener to click or submit button
const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const title = bookTitle.value.trim();
  const author = bookAuthor.value.trim();
  if (title && author) {
    Books.addBook(title, author);
  }
});

// Load books from local storage and render it on the page
Books.loadBooks().forEach((book) => {
  // Display book in list
  Books.renderBooks(book.id, book.title, book.author);
});

// Get the navigation links and content sections
const navLinks = document.querySelectorAll('header nav a');
const contentSections = document.querySelectorAll('.content-section');

// Add click event listeners to the navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    // Prevent the default link behavior
    event.preventDefault();

    // Get the ID of the clicked link
    const sectionId = event.target.getAttribute('href');

    // Remove the "active" class from all links and content sections
    navLinks.forEach((link) => link.classList.remove('active'));
    contentSections.forEach((section) => section.classList.add('hidden'));

    // Add the "active" class to the clicked link
    event.target.classList.add('active');

    // Show the corresponding content section
    document.querySelector(sectionId).classList.remove('hidden');
  });
});

const dateTime = () => {
  const date = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour24: true,
  };
  return date.toLocaleString('en-US', options);
};

const date = dateTime();
document.getElementById('date-time').innerHTML = `${date}`;
