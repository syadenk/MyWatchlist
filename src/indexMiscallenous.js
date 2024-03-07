function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginRight = "0px";
  }


function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }

  function setAutocompletePosition() {
    var searchInput = document.getElementById('searchIDMovie');
    var autocompleteContainer = document.getElementById('autocompleteResults');

    var rect = searchInput.getBoundingClientRect();
    autocompleteContainer.style.left = rect.left + 'px';
    autocompleteContainer.style.top = rect.bottom + 'px';
}

window.addEventListener('resize', setAutocompletePosition);


document.addEventListener('DOMContentLoaded', function() {
    
    var autocompleteContainer = document.getElementById('autocompleteResults');
    autocompleteContainer.style.display = 'none';
});

function displayAutocompleteResults(results) {
    var autocompleteContainer = document.getElementById('autocompleteResults');
    autocompleteContainer.innerHTML = '';

    
    var ul = document.createElement('ul');
    results.forEach((result) => {
        var li = document.createElement('li');
        li.textContent = result.Title;
        li.addEventListener('click', function () {
            
            document.getElementById('searchIDMovie').value = result.Title;
            
            
            fetchMovieDetails(result.Title);
            
            
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

document.addEventListener('click', function (event) {
    var autocompleteContainer = document.getElementById('autocompleteResults');
    var searchInput = document.getElementById('searchIDMovie');

    
    if (searchInput.value.trim() !== '' && document.activeElement === searchInput) {
        autocompleteContainer.style.display = 'block';
    } else {
        autocompleteContainer.style.display = 'none';
    }

   
    if (event.target !== searchInput && !searchInput.contains(event.target) &&
        event.target !== autocompleteContainer && !autocompleteContainer.contains(event.target)) {
        clearAutocompleteResults();
        autocompleteContainer.style.display = 'none';
    }
});
