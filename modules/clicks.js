const clicks = () => {
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
}

export default clicks;