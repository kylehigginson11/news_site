// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    var newsData = {};
    var searchData = [];

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
                    console.log("catch");
                    $('#popularHeader').find('.row:first').prepend('<div class="col-md-3"><h6>' + data.response.mostViewed[i]['webTitle'] + '</h6>' + '<img src="images/image_unavailable.png" ' +
                        'class="img-fluid"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">View More</button></div>');
                }
            }
        }

        for (var x = 5; x < 9; x++) {
            try {
                $('header').find('.extra .row').append('<div class="col-md-3"  data-target="' + x + '"><h6>' + data.response.mostViewed[x]['webTitle'] + '</h6>' + '<img src="' + data.response.mostViewed[x]['blocks']['main']['elements'][0]['assets'][0]['file'] +
                    '" class="img-fluid"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">View More</button></div>');
            } catch (error) {
                $('header').find('.extra .row').append('<div class="col-md-3"  data-target="' + x + '"><h6>' + data.response.mostViewed[x]['webTitle'] + '</h6>' + '<img src="" ' +
                    'class="img-fluid"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">View More</button></div>');
            }
        }

        for (var a = 0; a < data.response.mostViewed.length; a++) {
            searchData.push({
                "label": data.response.mostViewed[a]["webTitle"],
                "category": "popular",
                "index": a
            });
        }
    });

    $.get("sample_data/recent_articles.json", function (data, status) {
        var recentNews = "";

        for (var a = 0; a < 6; a++) {
            recentNews += data.response.results[a]["webTitle"] + " - RECENT NEWS - ";
        }

        $('#recentNewsMarquee').text(recentNews);
    });

    $.get("sample_data/sport_articles.json", function (data, status) {
        newsData["sport"] = data;
        for (var i = 0; i < 6; i++) {
            try {
                $('#sportNewsSection').find('.container > .row:first').append('<div class="col col-sm-4 col-lg-2"><h6>' + data.response.results[i]['webTitle'] + '</h6>' + '<img src="' + data.response.results[i]['blocks']['main']['elements'][0]['assets'][0]['file'] + '" class="img-fluid">' +
                    '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="sport">View More</button></div>');
            } catch (error) {
                $('#sportNewsSection').find('.container > .row:first').append('<div class="col col-sm-4 col-lg-2"><h6>' + data.response.results[i]['webTitle'] + '</h6>' + '<img src="images/image_unavailable.png" class="img-fluid">' +
                    '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="sport">View More</button></div>');
            }
        }

        for (var a = 0; a < data.response.results.length; a++) {
            searchData.push({
                "label": data.response.results[a]["webTitle"],
                "category": "sport",
                "index": a
            });
        }
    });

    $.get("sample_data/tech_articles.json", function (data, status) {
        newsData["tech"] = data;
        for (var i = 0; i < 6; i++) {
            try {
                $('#techNewsSection').find('.container > .row:first').append('<div class="col-md-2"><h6>' + data.response.results[i]['webTitle'] + '</h6>' + '<img src="' + data.response.results[i]['blocks']['main']['elements'][0]['assets'][0]['file'] + '" class="img-fluid">' +
                    '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="tech">View More</button></div>');
            } catch (error) {
                $('#techNewsSection').find('.container > .row:first').append('<div class="col-md-2"><h6>' + data.response.results[i]['webTitle'] + '</h6>' + '<img src="images/image_unavailable.png" class="img-fluid">' +
                    '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="tech">View More</button></div>');
            }
        }

        for (var a = 0; a < data.response.results.length; a++) {
            searchData.push({
                "label": data.response.results[a]["webTitle"],
                "category": "tech",
                "index": a
            });
        }
    });

    $.get("sample_data/politics_articles.json", function (data, status) {
        newsData["politics"] = data;
        for (var i = 0; i < 6; i++) {
            try {
                $('#politicsNewsSection').find('.container > .row:first').append('<div class="col-md-2"><h6>' + data.response.results[i]['webTitle'] + '</h6>' + '<img src="' + data.response.results[i]['blocks']['main']['elements'][0]['assets'][0]['file'] + '" class="img-fluid">' +
                    '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="politics">View More</button></div>');
            }
            catch (err) {
                $('#politicsNewsSection').find('.container > .row:first').append('<div class="col-md-2"><h6>' + data.response.results[i]['webTitle'] + '</h6>' + '<img src="images/image_unavailable.png" class="img-fluid">' +
                    '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="politics">View More</button></div>');
            }
        }

        for (var a = 0; a < data.response.results.length; a++) {
            searchData.push({
                "label": data.response.results[a]["webTitle"],
                "category": "politics",
                "index": a
            });
        }
    });

    $(function () {
        $("#input").autocomplete({
            minLength: 0,
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
            return $("<li>")
                .append("<a>" + item.label + "</a>")
                .appendTo(ul);
        };
    });

    $(document).on("click", "button.full-article", function () {
        var index = $(this).data("target");
        var category = $(this).attr('data-category');
        show_modal(category, index, newsData);
    });

});