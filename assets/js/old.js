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
    .then((response) => {
      if (response.ok) {
          console.log(response)
          return response.json();
      } else {
          throw new Error("NETWORK RESPONSE ERROR");
      }
      })
      .then(data => {
          console.log(data);
          data.forEach(items => {
            document.getElementById('book').insertAdjacentHTML('beforeend', htmlString)
            displayBook(data)
          });
      })
 var book = data.items
 var bookContents = data.items.volumeInfo[0]
 var bookDiv = document.getElementById("book");
 var heading = document.createElement("h1");
 var bookImgEl = document.createElement("img");
 var bookImg = data.items.volumeInfo.imageLinks[1];
 var bookName = data.items.volumeInfo.title[0];
 var bookGenre = data.items.volumeInfo.categories[0];
 var bookAuthor = data.items.volumeInfo.authors[0]
 var htmlString = `
  <div id="book" class="book">
     <img id="book-image" src=${bookImg} alt="book cover">
    <div id="book-title" class="book-info">
       <h3 id="book-title-text">${bookName}</h3>
       <p id="book-author-text">Author:${bookAuthor}<span id="book-author"></span></p>
       <p id="book-genre-text">Genre:${bookGenre}<span id="book-genre"></span></p>
      </div>
     <div class="overview">
      <h3>Overview</h3>
      <p id="book-summary">Movie summary here.</p>
     </div>
  </div>
  ` 
          
          heading.innerHTML = bookName;
          bookDiv.appendChild(heading);
          bookImgEl = data.items.volumeInfo.imageLinks[1];
          bookDiv.appendChild(bookImgEl);
          document.body.style.backgroundImage = "url('" + data.items.volumeInfo.imageLinks[1] + "')";
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

bookFormEl.addEventListener('submit', formSubmitHandler);


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
  })};
