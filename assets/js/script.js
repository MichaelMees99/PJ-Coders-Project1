var bookFormEl = document.querySelector('#book-form');
var genreButtonsEl = document.querySelector('#genre-buttons');
var titleInputEl = document.querySelector('#title');
var bookContainerEl = document.querySelector('#book-container');
var bookSearchTerm = document.querySelector('#book-search-term');


var formSubmitHandler = function (event) {
  event.preventDefault();

  var bookName = titleInputEl.value.trim();

  if (bookName) {
    getBookTitles(bookName);

    bookContainerEl.textContent = '';
    titleInputEl.value = '';
  } else {
    alert('Please enter a book Title');
  }
};

var buttonClickHandler = function (event) {
  // `event.target` is a reference to the DOM element of what programming language button was clicked on the page
  var genre = event.target.getAttribute('data-genre');

  // If there is no language read from the button, don't attempt to fetch repos
  if (genre) {
    getBookGenre(genre);

    repoContainerEl.textContent = '';
  }
};

var getBookTitles = function (bookTitle) {
  var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + bookTitle + '&key=AIzaSyAAbz3cC9JqWTs8EhHObj34287KYDMQWpM';

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
            displayBooks(data, bookTitle);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GoogleBooks');
    });
};

var getBookGenre = function (genre) {
  // The `q` parameter is what genre we want to query, the `+is:featured` flag adds a filter to return only featured repositories
  // The `sort` parameter will instruct GitHub to respond with all of the repositories in order by the number of issues needing help
  var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:' + genre + '&key=AIzaSyAAbz3cC9JqWTs8EhHObj34287KYDMQWpM';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayBooks(data.items, genre);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayBooks = function (items, searchTerm) {
  if (items.length === 0) {
    bookContainerEl.textContent = 'No books found.';
    // Without a `return` statement, the rest of this function will continue to run and perhaps throw an error if `repos` is empty
    return;
  }

  bookSearchTerm.textContent = searchTerm;

  for (var i = 0; i < items.length; i++) {

    var bookName = items[i].volumeInfo.title;
    var bookImage = items[i].volumeInfo.imageLinks.thumbnail;
    var bookAuthor = items[i].volumeInfo.authors[0];

    var booksEl = document.createElement('div');
    booksEl.classList = 'list-item flex-row justify-space-between align-center';

    var imageEl = document.createElement('img');
    imageEl.src = bookImage;

    var titleEl = document.createElement('span');
    titleEl.textContent = bookName;

    booksEl.appendChild(titleEl);
    booksEl.appendChild(imageEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    booksEl.appendChild(statusEl);

    bookContainerEl.appendChild(booksEl);
  }
};
bookFormEl.addEventListener('submit', formSubmitHandler);
genreButtonsEl.addEventListener('click', buttonClickHandler);

//resources:
//book title info: items[0].volumeInfo.title
//book cover image: items[0].volumeInfo.imageLinks.thumbnail
//book description: items[0].volumeInfo.description
//book rating: items[0].volumeInfo.averageRating
//book genre: items[0].volumeInfo.categories
//book author: items[0].volumeInfo.authors[0]

//CKC adding Maps API

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  
  });
}