// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {
    var newsData = new Object();
    var searchData = [];
    $.get("sample_data/popular_articles.json", function (data, status) {
        newsData["popular"] = data;
        for (var i = 0; i < 4; i++) {
            $('#popularHeader').append('<div class="col-md-3"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] +
                '"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">Full Article</button></div>');
        }

        for (var a = 0; a < data.articles.results.length; a++) {
            searchData.push({
                "title": data.articles.results[a]["title"],
                "category": "popular",
                "index": a
            });
        }
    });

    $.get("sample_data/recent_articles.json", function (data, status) {
        newsData["recent"] = data;
        for (var i = 0; i < 4; i++) {
            $('#recentHeader').append('<div class="col-md-3"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] + '"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="recent">Full Article</button></div>');
        }
    });

    $.get("sample_data/sport_articles.json", function (data, status) {
        newsData["sports"] = data;
        for (var i = 0; i < 6; i++) {
            $('#sportNewsSection > .container > .row:first').append('<div class="col-md-2"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] + '">' +
                '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="sports">Full Article</button></div>');
        }
        for (var x = 7; x < 13; x++) {
            $('#sportNewsSection > .container > .extra .row').append('<div class="col-md-2"  data-target="' + x + '"><h6>' + data.articles.results[x]['title'] + '</h6>' + '<img src="' + data.articles.results[x]['image'] + '"></div>');
        }
    });

    $(function () {
        $("#input").autocomplete({
            minLength: 0,
            source: searchData,
            focus: function (event, ui) {
                $("#input").val(ui.item.title);
                return false;
            },
            select: function (event, ui) {
                $("#input").val(ui.item.title);
                window.location.href = '/product/' + ui.item.id;
                return false;
            }
        })

            .data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<a>" + item.title + "</a>")
                .appendTo(ul);
        };
    });


});