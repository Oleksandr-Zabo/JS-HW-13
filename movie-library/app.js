let cinemaData = {
    "movies": []
};

function loadingCinemaData(){
    fetch('/movie-library/movie.json')
    .then(response => response.json())
    .then(data => {
        cinemaData.movies = data;
        renderMovies(cinemaData.movies);
    })
    .catch(error => console.error('Error loading cinema data: ', error));
}

function renderMovies(movies) {
    const movieList = document.getElementById('movie-list');

    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <h3>${movie.title}</h3>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p>Genre: ${movie.genre}</p>
            <p>Year: ${movie.year}</p>
        `;
        movieList.appendChild(movieItem);
    });
}

loadingCinemaData();

const movieForm = document.getElementById('movie-form');
movieForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;

    const newMovie = {
        id: cinemaData.movies.length + 1,
        title: title,
        director: director,
        genre: genre,
        year: parseInt(year)
    };
    cinemaData.movies.push(newMovie);
    renderMovies(cinemaData.movies);
    movieForm.reset();
});

// Function to apply both filtering and sorting
function applyFiltersAndSorting() {
    const selectedGenre = document.getElementById('genre-filter').value;
    const selectedSort = document.getElementById('year-sort').value;
    
    // Start with all movies
    let filteredMovies = [...cinemaData.movies];
    
    // Apply genre filter
    if (selectedGenre) {
        filteredMovies = filteredMovies.filter(movie => movie.genre === selectedGenre);
    }
    
    // Apply year sorting
    if (selectedSort === 'asc') {
        filteredMovies.sort((a, b) => a.year - b.year);
    } else if (selectedSort === 'desc') {
        filteredMovies.sort((a, b) => b.year - a.year);
    }
    
    renderMovies(filteredMovies);
}

// Genre filter event listener
const genreFilter = document.getElementById('genre-filter');
genreFilter.addEventListener('change', applyFiltersAndSorting);

// Year sort event listener
const yearSort = document.getElementById('year-sort');
yearSort.addEventListener('change', applyFiltersAndSorting);

// Clear filters button event listener
const clearFiltersBtn = document.getElementById('clear-filters');
clearFiltersBtn.addEventListener('click', function() {
    // Reset all filter controls
    document.getElementById('genre-filter').value = '';
    document.getElementById('year-sort').value = '';
    
    // Show all movies without any filters or sorting
    renderMovies(cinemaData.movies);
});