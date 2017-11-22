// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    var newsData = new Object();
    var searchData = [];

    $.get("sample_data/popular_articles.json", function (data, status) {
        newsData["popular"] = data;
        for (var i = 0; i < 4; i++) {
            $('#popularHeader').prepend('<div class="col-md-3"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] +
                '"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">Full Article</button></div>');
        }

        for (var x = 5; x < 9; x++) {
            $('#popularHeader > .extra .row').append('<div class="col-md-3"  data-target="' + x + '"><h6>' + data.articles.results[x]['title'] + '</h6>' + '<img src="' + data.articles.results[x]['image'] +
                '"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">Full Article</button></div>');
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
        newsData["recent"] = data;
        for (var i = 0; i < 4; i++) {
            $('#recentHeader').prepend('<div class="col-md-3"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] + '"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="recent">Full Article</button></div>');
        }

        for (var x = 5; x < 9; x++) {
            $('#recentHeader > .extra .row').append('<div class="col-md-3"  data-target="' + x + '"><h6>' + data.articles.results[x]['title'] + '</h6>' + '<img src="' + data.articles.results[x]['image'] +
                '"><button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="popular">Full Article</button></div>');
        }

        for (var a = 0; a < data.articles.results.length; a++) {
            searchData.push({
                "label": data.articles.results[a]["title"],
                "category": "recent",
                "index": a
            });
        }
    });

    $.get("sample_data/sport_articles.json", function (data, status) {
        newsData["sport"] = data;
        for (var i = 0; i < 6; i++) {
            $('#sportNewsSection > .container > .row:first').append('<div class="col-md-2"><h6>' + data.articles.results[i]['title'] + '</h6>' + '<img src="' + data.articles.results[i]['image'] + '">' +
                '<button type="button" class="full-article btn btn-success" data-target="' + i + '" data-category="sport">Full Article</button></div>');
        }

        for (var a = 0; a < data.articles.results.length; a++) {
            searchData.push({
                "label": data.articles.results[a]["title"],
                "category": "sport",
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
                $('#articleTitle').text(newsData[category]["articles"]["results"][index].title);
                $('#articleBody').text(newsData[category]["articles"]["results"][index].body);
                $('#articleImg').attr('src', newsData[category]["articles"]["results"][index].image);
                $('#seeMoreModal').modal('show');
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
        $('#articleTitle').text(newsData[category]["articles"]["results"][index].title);
        $('#articleBody').text(newsData[category]["articles"]["results"][index].body);
        $('#articleImg').attr('src', newsData[category]["articles"]["results"][index].image);
        $('#seeMoreModal').modal('show');
    });

});