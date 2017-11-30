// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {
    /*
     This controls the buttons in the navigation bar, by selecting the button in the header
     which are siblings of the tab class. Again, using the data-target value, scroll to the div with ID matching
     data-target.
     */
    $(function () {
        $("#categoryArticles").tabs({active: '#sportNewsSection'})
    });
    // show extra articles for recent and popular articles
    $(document).on("click", "header button.see-more-btn", function () {
        var section = $('#popularHeader').find('.extra');
        if ($(section).css('display') === "none") {
            $(section).show("blind", 500);
            $(this).text("See Less");
        } else {
            $(section).hide("blind", 500);
            $(this).text("See More");
        }
    });

    $('section .refresh-icon').click(function () {
        var category = $(this).data('target');
        if (category === "sport"){
            loadJsonData("sample_data/sport_articles.json", "sport");
        } else if (category === "tech") {
            loadJsonData("sample_data/tech_articles.json", "tech");
        } else if (category === "politics") {
            loadJsonData("sample_data/politics_articles.json", "politics");
        }
    })

});