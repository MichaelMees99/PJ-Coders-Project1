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
  var language = event.target.getAttribute('data-language');

  // If there is no language read from the button, don't attempt to fetch repos
  if (language) {
    getFeaturedRepos(language);

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
          //displayBooks(data, bookTitle);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GoogleBooks');
    });
};

bookFormEl.addEventListener('submit', formSubmitHandler);
genreButtonsEl.addEventListener('click', buttonClickHandler);