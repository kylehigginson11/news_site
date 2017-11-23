// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    var newsData = {};
    var searchData = [];

    $.get("sample_data/popular_articles.json", function (data, status) {
        newsData["popular"] = data;
        for (var i = 0; i < 4; i++) {
            $('#popularHeader').find('.row:first').prepend('<div class="col-md-3"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] +
                '"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">View More</button></div>');
        }

        for (var x = 5; x < 9; x++) {
            $('header').find('.extra .row').append('<div class="col-md-3"  data-target="' + x + '"><h6>' + data.articles.results[x]['title'] + '</h6>' + '<img src="' + data.articles.results[x]['image'] +
                '"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">View More</button></div>');
        }

        for (var a = 0; a < data.articles.results.length; a++) {
            searchData.push({
                "label": data.articles.results[a]["title"],
                "category": "popular",
                "index": a
            });
        }
    });

    $.get("sample_data/recent_articles.json", function (data, status) {
        var recentNews = "";

        for (var a = 0; a < 10; a++) {
            recentNews += data.articles.results[a]["title"] + " - RECENT NEWS - ";
        }

        $('#recentNewsMarquee').text(recentNews);
    });

    $.get("sample_data/sport_articles.json", function (data, status) {
        newsData["sport"] = data;
        for (var i = 0; i < 6; i++) {
            $('#sportNewsSection').find('.container > .row:first').append('<div class="col col-sm-4 col-lg-2"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] + '">' +
                '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="sport">View More</button></div>');
        }

        for (var a = 0; a < data.articles.results.length; a++) {
            searchData.push({
                "label": data.articles.results[a]["title"],
                "category": "sport",
                "index": a
            });
        }
    });

    $.get("sample_data/tech_articles.json", function (data, status) {
        newsData["tech"] = data;
        for (var i = 0; i < 6; i++) {
            $('#techNewsSection').find('.container > .row:first').append('<div class="col-md-2"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] + '">' +
                '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="tech">View More</button></div>');
        }

        for (var a = 0; a < data.articles.results.length; a++) {
            searchData.push({
                "label": data.articles.results[a]["title"],
                "category": "tech",
                "index": a
            });
        }
    });

    $.get("sample_data/politics_articles.json", function (data, status) {
        newsData["politics"] = data;
        for (var i = 0; i < 6; i++) {
            $('#politicsNewsSection').find('.container > .row:first').append('<div class="col-md-2"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] + '">' +
                '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="politics">View More</button></div>');
        }

        for (var a = 0; a < data.articles.results.length; a++) {
            searchData.push({
                "label": data.articles.results[a]["title"],
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