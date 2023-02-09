var tableBody = document.getElementById('card-display');
var fetchButton = document.getElementById('fetch-button');
var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=AIzaSyAAbz3cC9JqWTs8EhHObj34287KYDMQWpM'

fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.items[0])
      //Loop over the data to generate a table, each table row will have a link to the repo url
      for (var i = 0; i < data.length; i++) {
        // Creating elements, tablerow, tabledata, and anchor
        var createTableRow = document.createElement('tr');
        var tableData = document.createElement('td');
        var link = document.createElement('a');

        // Setting the text of link and the href of the link
        link.textContent = data.items[i].html_url;
        link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
        tableData.appendChild(link);
        createTableRow.appendChild(tableData);
        tableBody.appendChild(createTableRow);
      }
});

fetchButton.addEventListener('click', getApi);

