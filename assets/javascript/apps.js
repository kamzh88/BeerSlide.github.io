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
    $.ajax({ url: queryURL, method: "GET" })
        .done(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var animalDiv = $('<div>');
                var p = $('<p>').text("Rating: " + response.data[i].rating);
                var animalImage = $('<img class="gif">');
                animalImage.attr('src', response.data[i].images.fixed_height_still.url);
                animalDiv.prepend(p);
                animalDiv.prepend(animalImage);
                $('#image-div').prepend(animalDiv);
            }
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
$('#search-button').on("click", function(){
    event.preventDefault();
    displayImage(animals);
});

//make gif animate
// $('.gif').on('click', function() {
    

// })

$(document).on("click", ".animal-btn", displayImage);

renderButtons();

//When I click on the select-search button it is not showing the results.
//Currently it is just making a button and I have to click on the button to show the results.
//make the images play when clicked
