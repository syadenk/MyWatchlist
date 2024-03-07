var watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];
if (performance && performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    watchlistMovies = [];
    localStorage.setItem('watchlistMovies', JSON.stringify(watchlistMovies));
}

function searchID() {
    var movieTitle = document.getElementById('searchIDMovie').value;

    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${movieTitle}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            document.getElementById("searchContainer").style.display = "block";
            document.getElementById("recommendedMovies").style.display = "none";
            document.getElementById("title").innerHTML = data.Title;
            document.getElementById("Year").innerHTML = data.Year;
            document.getElementById("Genre").innerHTML = data.Genre;
            document.getElementById("Director").innerHTML = data.Director;
            document.getElementById("Actors").innerHTML = data.Actors;
            document.getElementById("Plot").innerHTML = data.Plot;
            var img = document.createElement('img');
            img.src = data.Poster;
            img.width = 600;
            img.height = 500;
            document.getElementById('imageContainer').innerHTML = '<img src="' + data.Poster + '" width="600" height="500">';
            document.getElementById("Rating").innerHTML = data.Ratings[0].Value;
            document.getElementById("sourceRating").innerHTML = data.Ratings[0].Source;
            document.getElementById("Awards").innerHTML = data.Awards;
            document.getElementById("Writer").innerHTML = data.Writer;

            var watchListButton = document.createElement('button');
            watchListButton.style.backgroundColor = 'white';
            watchListButton.textContent = 'Add to Watchlist';
            watchListButton.addEventListener('click', function() {
                
                title=data.Title
                this.onclick(addToWatchlist(title))
                event.stopPropagation();
            });
            document.getElementById('searchContainer').appendChild(watchListButton);

        })

}

function addToWatchlist(title) {
    var movies = title; 
    console.log(movies);

    var watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];

    
    var isInWatchlist = watchlistMovies.includes(movies);

    var message = document.getElementById('message');

    if (isInWatchlist) {
        if (message) {
            message.textContent = 'Already in watchlist!';
            message.style.display = 'block';
        }
    } else {
        
        watchlistMovies.push(movies);
        localStorage.setItem('watchlistMovies', JSON.stringify(watchlistMovies));

        if (message) {
            message.textContent = 'Added to watchlist!';
            message.style.display = 'block';
        }
    }

    console.log(watchlistMovies);

    if (message) {
        setTimeout(function () {
            message.style.display = 'none';
        }, 3000);
    }
}

function retrieveMovie(clickedTitle){

    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${clickedTitle}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        document.getElementById("searchContainer").style.display = "block";
        document.getElementById("recommendedMovies").style.display = "none";
        document.getElementById("title").innerHTML=data.Title
        document.getElementById("Year").innerHTML=data.Year
        document.getElementById("Genre").innerHTML=data.Genre
        document.getElementById("Director").innerHTML=data.Director
        document.getElementById("Actors").innerHTML=data.Actors
        document.getElementById("Plot").innerHTML=data.Plot
        var img = document.createElement('img')
        img.src=data.Poster
        img.width = 300
        img.height = 200
        document.getElementById('imageContainer').innerHTML='<img src="' + data.Poster + '" width="300" height="200">';
        document.getElementById("Rating").innerHTML=data.Ratings[0].Value;
        document.getElementById("sourceRating").innerHTML=data.Ratings[0].Source;
        document.getElementById("Awards").innerHTML=data.Awards
        document.getElementById("Writer").innerHTML=data.Writer
        var watchListButton = document.createElement('button');
            watchListButton.style.backgroundColor = 'white';
            watchListButton.textContent = 'Add to Watchlist';
            watchListButton.addEventListener('click', function () {
                
                var title = data.Title;
                addToWatchlist(title);
                event.stopPropagation();
            });

            document.getElementById('searchContainer').appendChild(watchListButton);
        })
        .catch((error) => {
            console.error('Error fetching movie data:', error);
        });
}


function autocompleteSearch() {
    var input = document.getElementById('searchIDMovie').value;

    
    var autocompleteContainer = document.getElementById('autocompleteResults');

    

    if (input.trim() !== '') {
        
        fetch(`https://www.omdbapi.com/?apikey=c1aecf62&s=${input}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === "True") {
                    displayAutocompleteResults(data.Search);
                    
                    autocompleteContainer.style.display = 'block';
                    setAutocompletePosition();
                } else {
                    
                    clearAutocompleteResults();
                    autocompleteContainer.style.display = 'none';
                }
            });
    } else {
        
        clearAutocompleteResults();
        autocompleteContainer.style.display = 'none';
    }
}


function fetchMovieDetails(title) {
    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${title}`)
    .then((response) => response.json())
    .then((data) => {
        if (data.Response === "True") {
            
            document.getElementById("searchContainer").style.display = "block";
            document.getElementById("recommendedMovies").style.display = "none";
            document.getElementById("title").innerHTML = data.Title;
            document.getElementById("Year").innerHTML = data.Year;
            document.getElementById("Genre").innerHTML = data.Genre;
            document.getElementById("Director").innerHTML = data.Director;
            document.getElementById("Actors").innerHTML = data.Actors;
            document.getElementById("Plot").innerHTML = data.Plot;
            
            var img = document.createElement('img');
            img.src = data.Poster;
            img.width = 300;
            img.height = 200;
            document.getElementById('imageContainer').innerHTML = '<img src="' + data.Poster + '" width="300" height="200">';
            document.getElementById("Rating").innerHTML = data.Ratings[0].Value;
            document.getElementById("sourceRating").innerHTML = data.Ratings[0].Source;
            document.getElementById("Awards").innerHTML = data.Awards;
            document.getElementById("Writer").innerHTML = data.Writer;
            var watchListButton = document.createElement('button');
            watchListButton.style.backgroundColor = 'white';
            watchListButton.textContent = 'Add to Watchlist';
            watchListButton.addEventListener('click', function() {
                
                title=data.Title
                this.onclick(addToWatchlist(title))
                event.stopPropagation();
            });
            document.getElementById('searchContainer').appendChild(watchListButton);

            
            document.getElementById("searchContainer").style.display = "block";
        } else {
            
            alert("Movie not found!");
        }
    });
}

function recommendedMovies() {
    var randomMovie1 = ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction"];
    var randomMovie2 = ["Schindler's List", "Forrest Gump", "Inception", "The Matrix"];
    var randomMovie3= ["Avatar","Avengers: Endgame","Titanic","Star Wars: The Force Awakens"];
    var randomNumber = Math.floor(Math.random() * 3);
    var selectedArray;


    if (randomNumber === 0) {
        selectedArray = randomMovie1;
    } else if (randomNumber === 1) {
        selectedArray = randomMovie2;
    }
    else {
        selectedArray = randomMovie3;
    }
    for (var i = 0; i < 5; i++) {
        fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${selectedArray[i]}`)
            .then((response) => response.json())
            .then((data) => {
                

                var movieBox = document.createElement('div');
                movieBox.className = 'movie-box';
                movieBox.style.width = '40%'; 
                movieBox.style.padding = '10px'; 
                movieBox.style.backgroundColor = 'rgb(22, 9, 9)';
                movieBox.addEventListener('mouseover', function() {
                    movieBox.style.backgroundColor = 'rgb(40, 20, 20)';
                });
                movieBox.addEventListener('mouseout', function() {
                    movieBox.style.backgroundColor = 'rgb(22, 9, 9)';
                }); 
                movieBox.style.borderRadius = '15px'; 
                movieBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; 
                movieBox.style.marginRight = '7%'; 

                var img = document.createElement('img');
                img.className= 'image-container';
                img.src = data.Poster;
                img.width = 200;
                img.height = 200;

                var titleElement = document.createElement('h3');
                titleElement.style.color = 'white';
                titleElement.innerHTML = data.Title;

                var yearElement = document.createElement('h6');
                yearElement.style.color = 'white';
                yearElement.innerHTML = data.Year;
                
                movieBox.appendChild(img);
                movieBox.appendChild(titleElement);
                movieBox.appendChild(yearElement);

                movieBox.addEventListener('click', function() {
                   
                    var clickedTitle = this.querySelector('h3').innerHTML;
                    this.onclick(retrieveMovie(clickedTitle))
                });


                
                document.getElementById('movieContainer').appendChild(movieBox);
            });
    }
}
recommendedMovies();
sessionStorage.setItem('watchlistMovies', JSON.stringify(watchlistMovies));
