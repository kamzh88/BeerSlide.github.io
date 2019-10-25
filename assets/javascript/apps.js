var animals = ["Cat", "Dog", "Bird", "Cow"];
// make buttons for the page
function renderButtons() {
    $("#search-buttons").empty();
    for (i = 0; i < animals.length; i++) {
        var btnDiv = $('<div>');
        var btn = $('<button>');
        btn.addClass("animal-btn");
        btn.text(animals[i]);
        btn.prepend(btnDiv);
        btn.attr("data-name", animals[i]);
        $('#search-buttons').append(btn);
    }
}

// display images and ratings on page
function displayImage(image) {
    var image = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + image + "&api_key=bC6kpJP97Ro3WfVUucytyb3MKmLkZcF9&limit=10";
    $.ajax({
        url: queryURL, method: "GET"
    }).then(function (response) {

        for (var i = 0; i < response.data.length; i++) {
            var animalDiv = $('<div>');

            //still URL gif img
            var imgURL = response.data[i].images.fixed_height_still.url

            //animate URL gif img
            var animateURL = response.data[i].images.fixed_height.url

            //Include a rating in a paragraph tag
            var rating = $('<p>').text("Rating: " + response.data[i].rating);

            var animalImage = $('<img>').attr({
                'data-state': 'still',
                'src': imgURL,
                'data-still': imgURL,
                'data-animate': animateURL,
                'class': 'gif'
            });
            
            animalDiv.prepend(rating);
            animalDiv.prepend(animalImage);
            $('#image-div').prepend(animalDiv);
        }
        //make gif animate
        $('.gif').on('click', function () {
            var state = $(this).attr('data-state');

            if (state === 'still') {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");

            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            
        });
    })
}

//when you select Go, you will creat a new button put images on the page.
$("#select-search").on("click", function (event) {
    event.preventDefault();
    var animal = $("#search-input").val().trim();
    animals.push(animal);
    renderButtons();
});

//select each button to show images
$('#search-button').on("click", function () {
    event.preventDefault();
    displayImage(animals);
});



$(document).on("click", ".animal-btn", displayImage);

renderButtons();

//When I click on the select-search button it is not showing the results.
//Currently it is just making a button and I have to click on the button to show the results.
//make the images play when clicked
