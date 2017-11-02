// Don't forget to change the API key!!!!!

function albumRow(album) {
  const row = `<div class="row m-t-1">
                <div class="col-xs-12">
                  <img src="${album.image[2]['#text']}" class='pull-left m-r-1'>
                  <h2>${album.name}</h2>
                  <p>${album.artist.name}</p>
                </div>
              </div>`;
  return row;
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const artist = document.getElementById('artist').value;

    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=YOUR-API-KEY&format=json&limit=5`;

    const container = document.getElementById('albums-container')

    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.error === undefined) {
          container.innerHTML = '';
          data.topalbums.album.forEach((album) => {
            const row = albumRow(album);
            container.insertAdjacentHTML('beforeend', row);
          });
        } else {
          container.innerHTML = data.message;
        }
      });
  });
});
