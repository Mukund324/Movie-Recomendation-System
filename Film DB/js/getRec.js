const button = document.getElementById("getrec");

async function getRecommendation(result) {
    let promise = await fetch(`http://www.omdbapi.com/?i=${result}&apikey=`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("movie-title").innerHTML = `<a href="https://imdb.com/title/${result}">${data.Title} (${data.Year})</a>`;
        document.getElementById("director").innerHTML = `${data.Director}`;
        document.getElementById("stars").innerHTML = `${data.Actors}`;
        document.getElementById("genre").innerHTML = `${data.Genre}`;
        document.getElementById("summary").innerHTML = `${data.Plot}`;
        document.getElementById("movie-poster").src=data.Poster;
        document.getElementById("imdb-rating").innerHTML = `${data.imdbRating}/10`
        data.Ratings.forEach(element => {
            console.log(element)
            if(element.Source == "Rotten Tomatoes") {
                document.getElementById("rotten-rating").innerHTML = `${element.Value}`
            }
        });
    })
    .catch((error) => console.log(error))
};

async function fetchRandomID() {
    let promise2 = await fetch('http://127.0.0.1:5000/api/v1/get')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        getRecommendation(data.id)
    }) 
}

button.addEventListener('click', () => {
    // let resp = fetchRandomID()
    // .then((result) => {
    //     console.log(result)
    //     getRecommendation(result);
    // }, (error) => console.log(error))

    fetchRandomID();

    // console.log(resp);
})