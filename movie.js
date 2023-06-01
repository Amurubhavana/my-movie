const APIURL = "https://api.themoviedb.org/3/discover/movie?with_original_language=te&api_key=23e17483aaafd33b60b11bec9a1fd77c";
const APISEARCH = "https://api.themoviedb.org/3/search/movie?&api_key=23e17483aaafd33b60b11bec9a1fd77c&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const noResults = document.getElementById("no-results");

getMovies(APIURL);

async function getMovies(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  const movies = responseData.results;

  if (movies.length === 0) {
    showNoResults();
    return;
  }

  showMovies(movies);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title } = movie;
    const movieX = document.createElement("div");
    movieX.classList.add("movie");

    movieX.innerHTML = `
      <img src="${IMGPATH + poster_path}" alt="${title} Poster"/>
      <div class="movie-data">
        <h3>${title}</h3>
      </div>
    `;

    main.appendChild(movieX);
  });
}

function showNoResults() {
  main.innerHTML = "";
  noResults.style.display = "no movies found";
}

function handleSearch(event) {
  event.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm) {
    getMovies(APISEARCH + searchTerm);
    search.value = "";
  } else {
    showNoResults();
  }
}

form.addEventListener("submit", handleSearch);
searchButton.addEventListener("click", handleSearch);
  