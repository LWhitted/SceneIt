const movieTitle = document.getElementsByClassName("movie-title");
const releaseDate = document.getElementsByClassName("release-date");
const moviesContainer = document.querySelector(".movies-container");

// function fetchMovieData() {
//     fetch("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }

document.addEventListener('DOMContentLoaded', function () {
    console.log(movieData);
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains("add-button")) {
            const movieID = event.target.dataset.imdbid;
            console.log(movieID);
            saveToWatchList(movieID);
        }
    })
})

function saveToWatchList(movieID) {
    console.log(movieID);
    const movie = movieData.find(function (currentMovie) {
        return currentMovie.imdbID == movieID;
    });
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    if (watchlist == null) {
        watchlist = [];
        console.log(movie);
    }
    watchlist.push(movie);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);
}

const myForm = document.getElementById('search-form');

myForm.addEventListener('submit', async function (e) {
    e.preventDefault();


    const searchString = document.getElementsByClassName('search-bar')[0].value;
    let urlEncodedSearchString = encodeURIComponent(searchString)
    await fetch("https://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString)
        .then(async function (response) {
            return await response.json();
        })
        .then(function (data) {
            moviesContainer.innerHTML = renderMovies(data.Search);
            movieData = data.Search;
        });
    console.log(urlEncodedSearchString);



    function renderMovies(movieArray) {

        const movieHtmlArray = movieArray.map(function (currentMovie) {
            console.log(currentMovie.imdbID);
            return `<div class="row align-items-center">
                <div class="col" >
                <div class="movie" style="width: 18rem; text-align: center; margin-bottom: 30px;">
                  <img src="${currentMovie.Poster}" class="card-img-top" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">${currentMovie.Title}</h5>
                    <p class="card-text">${currentMovie.Year}</p>
                    <button class="add-button" data-imdbid="${currentMovie.imdbID}">Add Movie</button>
                  </div>
                </div>
                </div>
              </div>`
        })
        return movieHtmlArray.join('');
    }
})