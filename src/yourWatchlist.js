var watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];

var retrievedArray = JSON.parse(sessionStorage.getItem('watchlistMovies'));
console.log(retrievedArray);

function myWatchlist(retrievedArray) {
    console.log(retrievedArray);

    for (var i = 0; i < retrievedArray.length; i++) {
        fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${retrievedArray[i]}`)
            .then((response) => response.json())
            .then((data) => {
                
                var watchlistBox = document.createElement('div');
                watchlistBox.className = 'movie-box';
                watchlistBox.style.width = '40%';
                watchlistBox.style.padding = '10px';
                watchlistBox.style.backgroundColor = 'rgb(22, 9, 9)';
                watchlistBox.addEventListener('mouseover', function () {
                    watchlistBox.style.backgroundColor = 'rgb(40, 20, 20)';
                });
                watchlistBox.addEventListener('mouseout', function () {
                    watchlistBox.style.backgroundColor = 'rgb(22, 9, 9)';
                });
                watchlistBox.style.borderRadius = '15px';
                watchlistBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                watchlistBox.style.marginRight = '4.5%';

                var img = document.createElement('img');
                img.className = 'image-container';
                img.src = data.Poster;
                img.width = 200;
                img.height = 200;

                var titleElement = document.createElement('h3');
                titleElement.style.color = 'white';
                titleElement.innerHTML = data.Title;
                console.log(data.Title)

                var yearElement = document.createElement('h6');
                yearElement.style.color = 'white';
                yearElement.innerHTML = data.Year;

                watchlistBox.appendChild(img);
                watchlistBox.appendChild(titleElement);
                watchlistBox.appendChild(yearElement);

                watchlistBox.addEventListener('click', function () {
                    var clickedTitle = this.querySelector('h3').innerHTML;
                    this.onclick(retrieveMovie(clickedTitle));
                });

                document.getElementById('movieWatchlist').appendChild(watchlistBox);
            })
            .catch((error) => {
                console.error('Error fetching movie data:', error);
            });
    }
}

myWatchlist(retrievedArray);
function retrieveMovie(clickedTitle){

    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&t=${clickedTitle}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data)
        document.getElementById("searchContainer").style.display = "block";
        document.getElementById("watchlist").style.display = "none";
        
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
        var markAsWatchedButton = document.createElement('button');
                markAsWatchedButton.style.backgroundColor = 'white';
                markAsWatchedButton.textContent = 'Mark as Watched';
                markAsWatchedButton.addEventListener('click', function () {
                    var clickedTitle = this.parentElement.querySelector('h1').innerHTML; // Update to h1 for the movie title
                    markAsWatched(clickedTitle);
                    markAsWatchedButton.textContent = 'Watched';
                    
                });
        var watchListButton = document.createElement('button');
            watchListButton.style.backgroundColor = 'white';
            watchListButton.textContent = 'Remove from watchlist';
            watchListButton.addEventListener('click', function () {
                var title = data.Title;
                for (var i = 0; i < retrievedArray.length; i++){
                    if (title == retrievedArray[i]){
                        var title = retrievedArray[i]
                        removefromWatchlist(title)
                    }
                }
                
            });

            document.getElementById('searchContainer').appendChild(watchListButton);
            document.getElementById('searchContainer').appendChild(markAsWatchedButton);
        })
        .catch((error) => {
            console.error('Error fetching movie data:', error);
        });
}


function removefromWatchlist(title) {
    var movies = title;
    console.log(movies);

    var watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];

    var message = document.getElementById('message');

    watchlistMovies = watchlistMovies.filter(function (item) {
        return item !== movies;
    });

    localStorage.setItem('watchlistMovies', JSON.stringify(watchlistMovies));

    if (message) {
        message.textContent = 'Removed from watchlist!'; 
        message.style.display = 'block';
    }

    console.log(watchlistMovies);

    if (message) {
        setTimeout(function () {
            message.style.display = 'none';
        }, 3000);
    }
}

function markAsWatched(title) {
    var watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];

    var messagWatched = document.getElementById('messageWatched');
    var movieToMarkAsWatched = watchlistMovies.find(function (movie) {
        return movie.Title === title;
    });

    if (movieToMarkAsWatched) {
        movieToMarkAsWatched.watched = true;
        localStorage.setItem('watchlistMovies', JSON.stringify(watchlistMovies));
    }
    if (messagWatched) {
        message.textContent = 'Marked as Watched!'; 
        message.style.display = 'block';
    }
    if (messagWatched) {
        setTimeout(function () {
            message.style.display = 'none';
        }, 3000);
    }
}