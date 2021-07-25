const button = document.getElementById("getrec");
// const button2 = document.getElementById("previous");
// const button3 = document.getElementById("forward");
var button2, button3;

var hist = []
var i = 1
var loaded = true;
var loadedButton = true;

function setup() {
    loaded = false;
    let placeholder = document.getElementById('p-holder');
    placeholder.parentNode.removeChild(placeholder);
    let card = document.getElementsByClassName('card')[0],
        flexContainer = document.createElement('div');
        flexContainer.className = 'flex-container';
            let containerOne = document.createElement('div');
            containerOne.className = 'container-1';
                let image = document.createElement('img');
                image.className = 'movie-poster';
                image.id = 'movie-poster';
                image.src = '';
                containerOne.appendChild(image);

            let containerTwo = document.createElement('div');
            containerTwo.className = 'container-2';
                let containerTwoBox = document.createElement('div');
                containerTwoBox.className = 'container-2-box';
                    let movieTitle = document.createElement('h4');
                    movieTitle.id = 'movie-title';
                containerTwoBox.appendChild(movieTitle);
                containerTwoBox.appendChild(document.createElement("br"));

                    let imdbRating = document.createElement('span');
                    imdbRating.className = 'ratings-imdb';
                        let imdbImage = document.createElement('img');
                        imdbImage.className = 'icons-img'
                        imdbImage.src = 'images/imdb.png';
                        let imdbScore = document.createElement('span');
                        imdbScore.id = 'imdb-rating';
                        imdbScore.className = 'imdb-rating';
                    imdbRating.appendChild(imdbImage);
                    imdbRating.appendChild(imdbScore);
                    containerTwoBox.appendChild(imdbRating);

                    let rtScore = document.createElement('span');
                    rtScore.className = 'ratings-rotten';
                        let rtImage = document.createElement('img');
                        rtImage.className = 'icons-img'
                        rtImage.src = 'images/rotten.svg';
                        let rtRating = document.createElement('span');
                        rtRating.id = 'rotten-rating';
                        rtRating.className = 'rotten-rating'
                    rtScore.appendChild(rtImage);
                    rtScore.appendChild(rtRating);
                    containerTwoBox.appendChild(rtScore);
                    containerTwoBox.appendChild(document.createElement("br"));
                    containerTwoBox.appendChild(document.createElement("br"));

                    let directorTag = document.createElement('span');
                    directorTag.className = 'mini-heading';
                    directorTag.innerHTML = 'Director';
                    containerTwoBox.appendChild(directorTag);

                    let directorText = document.createElement('p');
                    directorText.id = 'director';
                    containerTwoBox.appendChild(directorText);

                    let starsTag = document.createElement('span');
                    starsTag.className = 'mini-heading';
                    starsTag.innerHTML = 'Stars';
                    containerTwoBox.appendChild(starsTag);

                    let starsText = document.createElement('p');
                    starsText.id = 'stars';
                    containerTwoBox.appendChild(starsText);

                    let genreTag = document.createElement('span');
                    genreTag.className = 'mini-heading';
                    genreTag.innerHTML = 'Genre';
                    containerTwoBox.appendChild(genreTag);

                    let genreText = document.createElement('p');
                    genreText.id = 'genre';
                    containerTwoBox.appendChild(genreText);

                    let summaryTag = document.createElement('span');
                    summaryTag.className = 'mini-heading';
                    summaryTag.innerHTML = 'Summary';
                    containerTwoBox.appendChild(summaryTag);

                    let summaryText = document.createElement('p');
                    summaryText.id = 'summary';
                    summaryText.className = 'summary-text'
                    containerTwoBox.appendChild(summaryText);

            containerTwo.appendChild(containerTwoBox)

        flexContainer.appendChild(containerOne);
        flexContainer.appendChild(containerTwo);

            let buttons = document.getElementsByClassName('buttons')[0];
                let forward = document.createElement('button');
                forward.className = 'button';
                forward.id = 'forward';
                forward.innerHTML = 'Forward';
                forward.addEventListener('click', populateForward, false);
                buttons.insertBefore(forward, buttons.firstChild);

                let previous = document.createElement('button');
                previous.className = 'button';
                previous.id = 'previous';
                previous.innerHTML = 'Previous';
                previous.addEventListener('click', populatePrevious, false);
                buttons.insertBefore(previous, buttons.firstChild);

        card.insertBefore(flexContainer, card.firstChild);
}

async function getRecommendation(result) {
    let promise = await fetch(`http://www.omdbapi.com/?i=${result}&apikey=`);
    let data = await promise.json();
    if(loaded == true) {
        setup();
    }

    document.getElementById("movie-title").innerHTML = `<a href="https://imdb.com/title/${result}">${data.Title} (${data.Year})</a>`;
    document.getElementById("director").innerHTML = `${data.Director}`;
    document.getElementById("stars").innerHTML = `${data.Actors}`;
    document.getElementById("genre").innerHTML = `${data.Genre}`;
    document.getElementById("summary").innerHTML = `${data.Plot}`;
    document.getElementById("movie-poster").src=data.Poster;
    document.getElementById("imdb-rating").innerHTML = `${data.imdbRating}/10`
    let rotten = '';
    data.Ratings.forEach(element => {
        if(element.Source == "Rotten Tomatoes") {
            rotten = document.getElementById("rotten-rating").innerHTML = `${element.Value}`;
        }
    });

    hist.push({
        'id' : result,
        'Title': `${data.Title} (${data.Year})`,
        'Director': `${data.Director}`,
        'Actors': `${data.Actors}`,
        'Genre': `${data.Genre}`,
        'Plot': `${data.Plot}`,
        'Poster': `${data.Poster}`,
        'imdbRating': `${data.imdbRating}/10`,
        'rotten': rotten,
    })

    button2 = document.getElementById("previous");
    button3 = document.getElementById("forward");
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
    fetchRandomID();
    loadedButton = false;
})

function populatePrevious() {
    try {
        let data = hist[hist.length - (i+1)]
        document.getElementById("movie-title").innerHTML = `<a href="https://imdb.com/title/${data.id}">${data.Title}</a>`;
        document.getElementById("director").innerHTML = `${data.Director}`;
        document.getElementById("stars").innerHTML = `${data.Actors}`;
        document.getElementById("genre").innerHTML = `${data.Genre}`;
        document.getElementById("summary").innerHTML = `${data.Plot}`;
        document.getElementById("movie-poster").src=data.Poster;
        document.getElementById("imdb-rating").innerHTML = `${data.imdbRating}`
        document.getElementById("rotten-rating").innerHTML = `${data.rotten}`;
        i += 1;
        console.log(i)
    } catch(error) {
        console.log("no more history available!");
    }
}

function populateForward() {
    try {
        let data = hist[hist.length - (i-1)]
        document.getElementById("movie-title").innerHTML = `<a href="https://imdb.com/title/${data.id}">${data.Title}</a>`;
        document.getElementById("director").innerHTML = `${data.Director}`;
        document.getElementById("stars").innerHTML = `${data.Actors}`;
        document.getElementById("genre").innerHTML = `${data.Genre}`;
        document.getElementById("summary").innerHTML = `${data.Plot}`;
        document.getElementById("movie-poster").src=data.Poster;
        document.getElementById("imdb-rating").innerHTML = `${data.imdbRating}`
        document.getElementById("rotten-rating").innerHTML = `${data.rotten}`;
        i -= 1;
        console.log(i)
    } catch(error) {
        console.log("no more history available!");
    }
}

