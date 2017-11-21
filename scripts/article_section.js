// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {
    $('section button.see-more-btn').click(function () {
        var section = $('#sportNewsSection .extra');
        if ($(section).css('display') === "none") {
            $(section).show("slide", {direction: "left"}, 1000);
            $(this).text("See Less");
        } else {
            $(section).hide("slide", {direction: "left"}, 1000);
            $(this).text("See More");
        }
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