let form = document.querySelector('form');
let container = document.querySelector('.image-container');
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    let query = form.querySelector('input').value;
    tvMazeApi(query);

})

async function tvMazeApi(query){
    const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const movies = await req.json();
    makeImages(movies);
}

function makeImages(movies){
    for(let movie of movies){
        let src = movie.show.image.medium;
        const img = document.createElement('img');
        img.src=src;
        container.appendChild(img);
    }
}
