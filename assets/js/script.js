var requestUrl = 'https://www.googleapis.com/books/v1/volumes?'

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  });

console.log(response)

//attempt to create card
var container = document.getElementById("container");
for( var i=1;i <=9; i++)
{
	var el = document.createElement("div");
  el.className ="card";
  el.id = "card" + i;
  el.innerHTML = "Movies";
  container.append(el);
}

<iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=API_KEY
    &q=Space+Needle,Seattle+WA">
</iframe>