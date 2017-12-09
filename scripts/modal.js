var article_text;

// function to show modal for more info on an article, takes in category, index and newsdata variable as parameters
function show_modal(category, index, newsData) {
    $('#fullTextButton').text("Show Full Text");
    var type = "results";
    if (category === "popular") {
        type = "mostViewed"
    }
    try {
        $('#articleTitle').text(newsData[category]["response"][type][index].webTitle);
        article_text = newsData[category]["response"][type][index]['blocks']['body'][0]['bodyTextSummary'];
        $('#articleBody').text(article_text);
        // try to slice the article text to 500 characters
        $('#articleBody').text(function (i, txt) {
            return txt ? txt.slice(0, 500) + "..." : txt;
        });
        $('#articleImg').attr('src', newsData[category]["response"][type][index]['blocks']['main']['elements'][0]['assets'][0]['file']);
        $('#viewFullArticle').attr('onclick', 'window.open("' + newsData[category]["response"][type][index].webUrl + '")');
        $('#seeMoreModal').modal('show');
    } catch (error) {
        $('#articleTitle').text(newsData[category]["response"][type][index].webTitle);
        article_text = newsData[category]["response"][type][index]['blocks']['body'][0]['bodyTextSummary'];
        $('#articleBody').text(article_text);
        $('#articleBody').text(function (i, txt) {
            return txt ? txt.slice(0, 500) + "..." : txt;
        });
        $('#articleImg').attr('src', "images/image_unavailable.svg");
        $('#viewFullArticle').attr('onclick', 'window.open("' + newsData[category]["response"][type][index].webUrl + '")');
        $('#seeMoreModal').modal('show');
    }

    $('#fullTextButton').on("click", function () {
        if ($('#articleBody').text().length === 503) {
            $('#articleBody').text(article_text);
            $(this).text("Show Less");
        } else {
            $('#articleBody').text(function (i, txt) {
                return txt ? txt.slice(0, 500) + "..." : txt;
            });
            $(this).text("Show More");
        }
    })

}


