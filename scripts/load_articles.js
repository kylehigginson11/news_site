var newsData = {};
var searchData = [];

function loadJsonData(url, category) {
    $.get(url, function (data, status) {
        newsData[category] = data;
        var section = $("#" + category + "NewsSection");
        $(section).find('.container > .row').html('');
        for (var i = 0; i < 8; i++) {
            try {
                section.find('.container > .row').append('<div class="col col-lg-3"><h6>' + data.response.results[i]['webTitle'] + '</h6>' + '<img src="' + data.response.results[i]['blocks']['main']['elements'][0]['assets'][0]['file'] + '" class="img-fluid">' +
                    '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="' + category + '">View More</button></div>');
            } catch (error) {
                section.find('.container > .row').append('<div class="col col-lg-3"><h6>' + data.response.results[i]['webTitle'] + '</h6>' + '<img src="images/image_unavailable.png" class="img-fluid">' +
                    '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="' + category + '">View More</button></div>');
            }
        }
        loadSearchData(category, data);
    });
}

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

    $.get("sample_data/popular_articles.json", function (data, status) {
        newsData["popular"] = data;
        for (var i = 0; i < 4; i++) {
            try {
                $('#popularHeader').find('.row:first').prepend('<div class="col-md-3"><h6>' + data.response.mostViewed[i]['webTitle'] + '</h6>' + '<img src="' + data.response.mostViewed[i]['blocks']['body'][4]['elements'][1]['assets'][0]['file'] +
                    '" class="img-fluid"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">View More</button></div>');
            }
            catch (error) {
                try {
                    $('#popularHeader').find('.row:first').prepend('<div class="col-md-3"><h6>' + data.response.mostViewed[i]['webTitle'] + '</h6>' + '<img src="' + data.response.mostViewed[i]['blocks']['main']['elements'][0]['assets'][0]['file'] +
                        '" class="img-fluid"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">View More</button></div>');
                } catch (error) {
                    $('#popularHeader').find('.row:first').prepend('<div class="col-md-3"><h6>' + data.response.mostViewed[i]['webTitle'] + '</h6>' + '<img src="images/image_unavailable.png" ' +
                        'class="img-fluid"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">View More</button></div>');
                }
            }
        }

        for (var x = 5; x < 9; x++) {
            try {
                $('header').find('.extra .row').append('<div class="col-md-3"  data-target="' + x + '"><h6>' + data.response.mostViewed[x]['webTitle'] + '</h6>' + '<img src="' + data.response.mostViewed[x]['blocks']['main']['elements'][0]['assets'][0]['file'] +
                    '" class="img-fluid"><button type="button" class="full-article btn btn-success" data-target="' + x + '" data-category="popular">View More</button></div>');
            } catch (error) {
                $('header').find('.extra .row').append('<div class="col-md-3"  data-target="' + x + '"><h6>' + data.response.mostViewed[x]['webTitle'] + '</h6>' + '<img src="" ' +
                    'class="img-fluid"><button type="button" class="full-article btn btn-success" data-target="' + x + '" data-category="popular">View More</button></div>');
            }
        }
        loadSearchData("popular", data);
    });

    loadJsonData("sample_data/sport_articles.json", "sport");
    loadJsonData("sample_data/tech_articles.json", "tech");
    loadJsonData("sample_data/politics_articles.json", "politics");

    $.get("sample_data/recent_articles.json", function (data, status) {
        var recentNews = "";

        for (var a = 0; a < 6; a++) {
            recentNews += data.response.results[a]["webTitle"] + " - RECENT NEWS - ";
        }

        $('#recentNewsMarquee').text(recentNews);
    });

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

    $(document).on("click", "button.full-article", function () {
        var index = $(this).data("target");
        var category = $(this).attr('data-category');
        show_modal(category, index, newsData);
    });

});