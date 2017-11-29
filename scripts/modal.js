function show_modal(category, index, newsData) {
    var type = "results";
    if (category === "popular") {
        type = "mostViewed"
    }
    try {
        $('#articleTitle').text(newsData[category]["response"][type][index].webTitle);
        $('#articleBody').text(newsData[category]["response"][type][index]['blocks']['body'][0]['bodyTextSummary']);
        $('#articleBody').text(function (i, txt) {
            return txt ? txt.slice(0, 500) + "..." : txt;
        });
        $('#articleImg').attr('src', newsData[category]["response"][type][index]['blocks']['main']['elements'][0]['assets'][0]['file']);
        $('#viewFullArticle').attr('onclick', 'window.open("' + newsData[category]["response"][type][index].webUrl + '")');
        $('#seeMoreModal').modal('show');
    } catch (error) {
        $('#articleTitle').text(newsData[category]["response"][type][index].webTitle);
        $('#articleBody').text(newsData[category]["response"][type][index]['blocks']['body'][0]['bodyTextSummary']);
        $('#articleImg').attr('src', "images/image_unavailable.png");
        $('#viewFullArticle').attr('onclick', 'window.open("' + newsData[category]["response"][type][index].webUrl + '")');
        $('#seeMoreModal').modal('show');
    }
}
