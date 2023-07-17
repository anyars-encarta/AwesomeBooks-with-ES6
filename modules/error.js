const errorMessage = () => {
    static showErrorMesssage(message) {
        const spanMessage = document.getElementById('message');
        const bookTitle = document.getElementById('title');
        const bookAuthor = document.getElementById('author');
  
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
      }, 2000); // Hide the error message after 2 seconds
    };
};
  
export default errorMessage;