// initialise dictionary for article data to be appended to for use in modal
var newsData = {};
// initialise array to load search content into
var searchData = [];

// function to load all the popular articles to home tab, show first 4 articles and give ability to see next 4
function loadHomeArticles() {
    $.ajax({
        type: 'GET',
        //url: "https://content.guardianapis.com/uk?show-most-viewed=true&show-blocks=all&page-size=10&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98",
        url: "sample_data/popular_articles.json",
        dataType: 'json',
        success: function (data) {
            newsData["popular"] = data;
            for (var i = 0; i < 4; i++) {
                try {
                    $('#popularHeader').find('.row:first').prepend('<div class="col col-sm-6 col-lg-3"><h6>' + data['response']['mostViewed'][i]['webTitle'] + '</h6>' + '<img src="' + data.response.mostViewed[i]['blocks']['body'][4]['elements'][1]['assets'][0]['file'] +
                        '" class="img-fluid"><button type="button" class="view-more-btn btn" data-target="' + i + '" data-category="popular">View More</button></div>');
                }
                // try to load again if error, the images on the returned JSON can be structured differently
                catch (error) {
                    try {
                        $('#popularHeader').find('.row:first').prepend('<div class="col col-sm-6 col-lg-3"><h6>' + data['response']['mostViewed'][i]['webTitle'] + '</h6>' + '<img src="' + data.response.mostViewed[i]['blocks']['main']['elements'][0]['assets'][0]['file'] +
                            '" class="img-fluid"><button type="button" class="view-more-btn btn" data-target="' + i + '" data-category="popular">View More</button></div>');
                    } catch (error) {
                        $('#popularHeader').find('.row:first').prepend('<div class="col col-sm-6 col-lg-3"><h6>' + data['response']['mostViewed'][i]['webTitle'] + '</h6>' + '<img src="images/image_unavailable.svg" ' +
                            'class="img-fluid"><button type="button" class="view-more-btn btn" data-target="' + i + '" data-category="popular">View More</button></div>');
                    }
                }
            }

            //load the next 4 articles to another div which is hidden but can be shown by clicking on see more button
            for (var x = 5; x < 9; x++) {
                try {
                    $('header').find('.extra .row').append('<div class="col col-sm-6 col-lg-3"  data-target="' + x + '"><h6>' + data['response']['mostViewed'][x]['webTitle'] + '</h6>' + '<img src="' + data.response.mostViewed[x]['blocks']['main']['elements'][0]['assets'][0]['file'] +
                        '" class="img-fluid"><button type="button" class="view-more-btn btn" data-target="' + x + '" data-category="popular">View More</button></div>');
                } catch (error) {
                    $('header').find('.extra .row').append('<div class="col col-sm-6 col-lg-3"  data-target="' + x + '"><h6>' + data['response']['mostViewed'][x]['webTitle'] + '</h6>' + '<img src="" ' +
                        'class="img-fluid"><button type="button" class="view-more-btn btn" data-target="' + x + '" data-category="popular">View More</button></div>');
                }
            }
            // pass the data to append into the search variable
            loadSearchData("popular", data);
        },
        error: function () {
            $('#popularHeader').find('.row:first').prepend(
                '<div class="alert alert-danger" role="alert">Unfortunately, there has been a problem loading' +
                'the news articles at this time, please try again by refreshing</div>');
        }
    });
}

/*
 Function takes two parameters, url and category, it loads the returned data and appends the articles to the div of the
 specified category.
 */
function loadJsonData(url, category) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (data) {
            newsData[category] = data;
            var section = $("#" + category + "NewsSection");
            $(section).find('.container > .row').html('');
            for (var i = 0; i < 8; i++) {
                try {
                    section.find('.container > .row').append('<div class="col col-sm-6 col-lg-3"><h6>' + data['response']['results'][i]['webTitle'] + '</h6>' + '<img src="' + data.response.results[i]['blocks']['main']['elements'][0]['assets'][0]['file'] + '" class="img-fluid">' +
                        '<button type="button" class="view-more-btn btn" data-target="' + i + '" data-category="' + category + '">View More</button></div>');
                } catch (error) {

                    try {
                        section.find('.container > .row').prepend('<div class="col col-sm-6 col-lg-3"><h6>' + data['response']['results'][i]['webTitle'] + '</h6>' + '<img src="' + data.response.results[i]['blocks']['main']['elements'][0]['assets'][0]['file'] +
                            '" class="img-fluid"><button type="button" class="view-more-btn btn" data-target="' + i + '" data-category="popular">View More</button></div>');
                    } catch (error) {
                        section.find('.container > .row').append('<div class="col col-sm-6 col-lg-3"><h6>' + data['response']['results'][i]['webTitle'] + '</h6>' + '<img src="images/image_unavailable.svg" class="img-fluid">' +
                            '<button type="button" class="view-more-btn btn" data-target="' + i + '" data-category="' + category + '">View More</button></div>');
                    }
                }
            }
            loadSearchData(category, data);
        },
        error: function () {
            console.log("Error");
        }
    });
}

// takes in two parameters, category and data, loads each article title, category name and index to the searchData array.
function loadSearchData(category, data) {
    var dataName = "";
    if (category === "popular") {
        dataName = "mostViewed";
    } else {
        dataName = "results";
    }
    for (var a = 0; a < data["response"][dataName].length; a++) {
        searchData.push({
            "label": data["response"][dataName][a]["webTitle"],
            "category": category,
            "index": a
        });
    }
}

// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    loadHomeArticles();
    //loadJsonData("https://content.guardianapis.com/search?section=sport&show-blocks=all&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98", "sport");
    //loadJsonData("https://content.guardianapis.com/search?section=technology&show-blocks=all&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98", "tech");
    //loadJsonData("https://content.guardianapis.com/search?section=politics&show-blocks=all&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98", "politics");
    //loadJsonData("https://content.guardianapis.com/search?section=science&show-blocks=all&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98", "politics");


    // load the articles for each category
    loadJsonData("sample_data/sport_articles.json", "sport");
    loadJsonData("sample_data/tech_articles.json", "tech");
    loadJsonData("sample_data/politics_articles.json", "politics");
    loadJsonData("sample_data/science_articles.json", "science");

    // load recent article headlines to marque which is fixed to bottom of screen
    //$.get("https://content.guardianapis.com/search?order-by=newest&page-size=6&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98", function (data, status) {
    $.get("sample_data/recent_articles.json", function (data, status) {
        var recentNews = "";

        for (var a = 0; a < 6; a++) {
            recentNews += data['response']['results'][a]["webTitle"] + " - RECENT NEWS - ";
        }

        $('#recentNewsMarquee').text(recentNews);
    });

    // use jQueryUI auto complete function to search for articles within the page.
    $(function () {
        $("#input").autocomplete({
            minLength: 3,
            source: searchData,
            focus: function (event, ui) {
                return false;
            },
            select: function (event, ui) {
                $("#input").val(ui.item.label);
                var index = ui.item.index;
                var category = ui.item.category;
                show_modal(category, index, newsData);
                return false;
            }
        })
            .data("ui-autocomplete")._renderItem = function (ul, item) {
            var title = item.label.slice(0, 45) + "...";
            return $("<li>")
                .append("<a>" + title + "</a>")
                .appendTo(ul);
        };
    });

    // click event when view more on an article is clicked which opens a modal
    $(document).on("click", "button.view-more-btn", function () {
        var index = $(this).data("target");
        var category = $(this).attr('data-category');
        // call the show modal function which is defined on the modal.js file
        show_modal(category, index, newsData);
    });

});