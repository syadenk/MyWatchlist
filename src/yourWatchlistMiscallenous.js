function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginRight = "0px";
  }


function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }



// Call setAutocompletePosition on window resize to handle responsive design
window.addEventListener('resize', setAutocompletePosition);


document.addEventListener('DOMContentLoaded', function() {
    // Hide autocomplete container on page load
    var autocompleteContainer = document.getElementById('autocompleteResults');
    autocompleteContainer.style.display = 'none';
});

function displayAutocompleteResults(results) {
    var autocompleteContainer = document.getElementById('autocompleteResults');
    autocompleteContainer.innerHTML = '';

    // Create and append a list of autocomplete results
    var ul = document.createElement('ul');
    results.forEach((result) => {
        var li = document.createElement('li');
        li.textContent = result.Title;
        li.addEventListener('click', function () {
            // Set the selected result in the search input
            document.getElementById('searchIDMovie').value = result.Title;
            
            // Fetch detailed information for the selected movie
            fetchMovieDetails(result.Title);
            
            // Clear autocomplete results after selecting
            clearAutocompleteResults();
        });
        ul.appendChild(li);
    });
    autocompleteContainer.appendChild(ul);
}

function clearAutocompleteResults() {
    var autocompleteContainer = document.getElementById('autocompleteResults');
    autocompleteContainer.innerHTML = '';
}