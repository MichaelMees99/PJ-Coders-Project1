var requestUrl = 'https://www.googleapis.com/books/v1/volumes?'

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  });

console.log(response)