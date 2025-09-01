let form = document.querySelector('form');
let container = document.querySelector('.image-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    container.innerHTML = "";
    let query = form.querySelector('input').value;
    fetchMovie(query);
});

async function fetchMovie(query) {
    const req = await fetch(`/movie?q=${query}`); 
    const movie = await req.json();
    makeCard(movie);
}

// keep your makeCard() function the same
function makeCard(movie) {
    if (movie.Response === "False") {
        container.innerHTML = `<h1>No results found</h1>`;
        return;
    }

    const card = document.createElement('div');
    card.classList.add('movie-card');

    // Poster
    if (movie.Poster && movie.Poster !== "N/A") {
        const img = document.createElement('img');
        img.src = movie.Poster;
        img.alt = movie.Title;
        card.appendChild(img);
    }

    // Title
    const title = document.createElement('h2');
    title.textContent = movie.Title;
    card.appendChild(title);

    // Director
    if (movie.Director) {
        const director = document.createElement('p');
        director.textContent = `Director: ${movie.Director}`;
        card.appendChild(director);
    }

    // Actors
    if (movie.Actors) {
        const actors = document.createElement('p');
        actors.textContent = `Actors: ${movie.Actors}`;
        card.appendChild(actors);
    }

    // Rating (IMDb)
    if (movie.imdbRating) {
        const rating = document.createElement('p');
        rating.textContent = `IMDb Rating: ${movie.imdbRating}`;
        card.appendChild(rating);
    }

    // Plot
    if (movie.Plot) {
        const plot = document.createElement('p');
        plot.textContent = movie.Plot;
        card.appendChild(plot);
    }

    container.appendChild(card);
}
