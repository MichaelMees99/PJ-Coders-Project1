// Define the base URL for the Google Books API
const baseUrl = "https://www.googleapis.com/books/v1/volumes";

// Get the HTML elements where you want to display the search results
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Define a function to fetch search results from the Google Books API
function searchBooks(query) {
  // Create a URL with the search query and the API key (replace YOUR_API_KEY with your actual API key)
  const url = `${baseUrl}?q=${query}&maxResults=32&key=AIzaSyAAbz3cC9JqWTs8EhHObj34287KYDMQWpM`;

  // Fetch the search results from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // Clear the previous search results
      searchResults.innerHTML = "";

      // Loop through the items in the search results and create HTML elements for each book
      data.items.forEach((item) => {
        // Create HTML elements for the book's title, author, and thumbnail image
        const title = document.createElement("h2");
        title.textContent = item.volumeInfo.title;
        title.classList.add("book-title");

        const author = document.createElement("p");
        author.textContent = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown author";
        author.classList.add("book-author");

        const description = document.createElement("p");
        description.textContent = item.volumeInfo.description ? item.volumeInfo.description.substring(0, 150) + "..." : "No description available";
        description.classList.add("book-description");

        const thumbnail = document.createElement("img");
        thumbnail.src = item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image";
        thumbnail.alt = item.volumeInfo.title;
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

        // Add the book container element to the search results
        searchResults.appendChild(bookCard);
      });
    })
    .catch((error) => console.error(error));
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

//CKC adding Maps API

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  })};
