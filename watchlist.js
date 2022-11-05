document.addEventListener('DOMContentLoaded', function () {
    const watchlistJSON = localStorage.getItem('watchlist');
    const watchlist = JSON.parse(watchlistJSON);
    const watchListContainer = document.querySelector(".movies-container");
    watchListContainer.innerHTML = renderMovies(watchlist);
});

function renderMovies(movieArray) {
    console.log(movieArray);
    const movieHtmlArray = movieArray.map(function (currentMovie) {
        return `<div class="movies-container" style= "display: flex; justify-content: space-between; flex-wrap: wrap;">
        <div class="row align-items-center">
            <div class="col">
            <div class="movie" style="width: 18rem; text-align: center;">
              <img src="${currentMovie.Poster}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="movie-title">${currentMovie.Title}</h5>
                <p class="release-date">${currentMovie.Year}</p>
              </div>
            </div>
            </div>
          </div>`
    })
    return movieHtmlArray.join('');
}


