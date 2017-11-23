function show_modal(category, index, newsData) {
    $('#articleTitle').text(newsData[category]["articles"]["results"][index].title);
    $('#articleBody').text(newsData[category]["articles"]["results"][index].body);
    $('#articleImg').attr('src', newsData[category]["articles"]["results"][index].image);
    $('#viewFullArticle').attr('onclick', 'window.open("' + newsData[category]["articles"]["results"][index].url+ '")');
    if (category === "popular") {
        $('#facebookLikes').text(newsData[category]["articles"]["results"][index].shares.facebook +
            " shares on Facebook!");
        $('.social-shares').show();
    } else {
        $('.social-shares').hide();
    }
    $('#seeMoreModal').modal('show');
}