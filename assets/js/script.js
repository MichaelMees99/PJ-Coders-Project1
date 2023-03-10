// Define the base URL for the Google Books API
var baseUrl = "https://www.googleapis.com/books/v1/volumes";

// Get the HTML elements where you want to display the search results
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
var searchResults = document.getElementById("search-results");
var savedBooksContainer = document.getElementById("saved-books");
var getSavedBooks = document.getElementById("get-saved-books");

//Define a function to save a book to local storage
function saveBook(book) {
  var savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || []; // Get saved books from local storage or create an empty array
  savedBooks.push(book); // Add the new book to the saved books array
  localStorage.setItem("savedBooks", JSON.stringify(savedBooks)); // Save the updated saved books array to local storage
}

//this function searches books and creates the cards for display
function searchBooks(query) {
  var url = `${baseUrl}?q=${query}&maxResults=32&key=AIzaSyAAbz3cC9JqWTs8EhHObj34287KYDMQWpM`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      //This Clears the previous search results
      searchResults.innerHTML = "";

      //this Loops through the items in the search results and create HTML elements for each book
      data.items.forEach((item) => {
        var title = document.createElement("h2");
        title.textContent = item.volumeInfo.title;
        title.classList.add("book-title");

        var author = document.createElement("p");
        author.textContent = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown author";
        author.classList.add("book-author");

        var description = document.createElement("p");
        description.textContent = item.volumeInfo.description ? item.volumeInfo.description.substring(0, 250) + "..." : "No description available";
        description.classList.add("book-description");

        var thumbnail = document.createElement("img");
        thumbnail.src = item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";
        thumbnail.alt = item.volumeInfo.title;
        thumbnail.classList.add("book-cover");
        
        //This reates a container element for the book's information
        var bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        bookInfo.appendChild(description);

        // Create a save button for the book
          var saveButton = document.createElement("button");
          saveButton.textContent = "Save for later";
          saveButton.classList.add("book-save-button");
          saveButton.addEventListener("click", () => {
          saveBook(item); 
          });
          bookInfo.appendChild(saveButton);

        var bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.appendChild(thumbnail);
        bookCard.appendChild(bookInfo);

        searchResults.appendChild(bookCard);

        thumbnail.addEventListener("click", () => {
          createBookModal(item);
        });
        searchResults.appendChild(bookCard);
      });
    })
    .catch((error) => console.error(error));
};

function createBookModal(book) {
  var title = document.createElement("h2");
  title.textContent = book.volumeInfo.title;
  title.classList.add("book-title");

  var author = document.createElement("p");
  author.textContent = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown author";
  author.classList.add("book-author");

  var description = document.createElement("p");
  description.textContent = book.volumeInfo.description || "No description available";
  description.classList.add("book-description");

  var thumbnail = document.createElement("img");
  thumbnail.src = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";
  thumbnail.alt = book.volumeInfo.title;
  thumbnail.classList.add("book-cover2");

  var bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");
  bookInfo.appendChild(title);
  bookInfo.appendChild(author);
  bookInfo.appendChild(description);
  bookInfo.appendChild(thumbnail);

  var modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.appendChild(bookInfo);

  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.appendChild(modalContent);


  var closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modalContent.appendChild(closeButton);


  modal.style.display = "block";


  document.body.appendChild(modal);
}



function displaySavedBooks() {
  console.log(displaySavedBooks)
  // Retrieve the saved books from wherever they are stored (e.g. a database or local storage)
  var savedBooks = getSavedBooks(); // Implement this function to retrieve the saved books

  // Clear the previous saved books
  savedBooksContainer.innerHTML = "";


  savedBooks.forEach((book) => {

    var title = document.createElement("h2");
    title.textContent = book.title;
    title.classList.add("book-title");

    const author = document.createElement("p");
    author.textContent = book.author;
    author.classList.add("book-author");

    const description = document.createElement("p");
    description.textContent = book.description.substring(0, 150) + "...";
    description.classList.add("book-description");

    const thumbnail = document.createElement("img");
    thumbnail.src = book.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";
    thumbnail.alt = book.title;
    thumbnail.classList.add("book-cover");

    // Create a container element for the book's information
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(description);

    // Create a container element for the book's thumbnail image and information
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.appendChild(thumbnail);
    bookCard.appendChild(bookInfo);

    // Add the book container element to the saved books container
    savedBooksContainer.appendChild(bookCard);
  });
}


// Handle the form submission to search for books
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting

  const query = searchInput.value; // Get the search query from the input field
  searchBooks(query); // Call the searchBooks function with the search query
});



//resources:
//book title info: items[0].volumeInfo.title
//book cover image: items[0].volumeInfo.imageLinks.thumbnail
//book description: items[0].volumeInfo.description
//book rating: items[0].volumeInfo.averageRating
//book genre: items[0].volumeInfo.categories
//book author: items[0].volumeInfo.authors[0]


//Google API Code

function initMap() {

  var options = {
    center: {lat: 33.7488 , lng:-84.3877 },
    zoom: 10
  }

  map = new google.maps.Map(document.getElementById("map"),options)
    
  }


//CKC adding Maps API

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
})};
