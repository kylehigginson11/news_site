var article_text = "";
// function to show modal for more info on an article, takes in category, index and newsdata variable as parameters
function show_modal(category, index, newsData) {
    $('#fullTextButton').text("Show Full Text");
    var type = "results";
    if (category === "popular") {
        type = "mostViewed"
    }
    try {
        $('#articleTitle').text(newsData[category]["response"][type][index].webTitle);
        $('#articleDate').text(newsData[category]["response"][type][index].webPublicationDate.substring(0, 10));
        article_text = newsData[category]["response"][type][index]['blocks']['body'][0]['bodyTextSummary'];
        // try to slice the article text to 500 characters
        $('#articleBody').text(function () {
            return article_text ? article_text.slice(0, 500) + "..." : article_text;
        });
        $('#articleImg').attr('src', newsData[category]["response"][type][index]['blocks']['main']['elements'][0]['assets'][0]['file']);
        $('#viewFullArticle').attr('onclick', 'window.open("' + newsData[category]["response"][type][index].webUrl + '")');
        $('#seeMoreModal').modal('show');
    } catch (error) {
        $('#articleTitle').text(newsData[category]["response"][type][index].webTitle);
        $('#articleDate').text(newsData[category]["response"][type][index].webPublicationDate.substring(0, 10));
        article_text = newsData[category]["response"][type][index]['blocks']['body'][0]['bodyTextSummary'];
        $('#articleBody').text(function () {
            return article_text ? article_text.slice(0, 500) + "..." : article_text;
        });
        $('#articleImg').attr('src', "images/image_unavailable.svg");
        $('#viewFullArticle').attr('onclick', 'window.open("' + newsData[category]["response"][type][index].webUrl + '")');
        $('#seeMoreModal').modal('show');
    }

}

$(document).ready(function () {
    $('#fullTextButton').on("click", function () {
        if ($(this).text() === "Show Full Text") {
            $('#articleBody').text(article_text);
            $(this).text("Show Less");
        } else {
            $('#articleBody').text(function () {
                return article_text ? article_text.slice(0, 500) + "..." : article_text;
            });
            $(this).text("Show Full Text");
        }
    })
});
