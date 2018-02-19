// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    // Show the sports section articles first.
    $(function () {
        $("#categoryArticles").tabs({active: '#sportNewsSection'})
    });

    // show extra popular articles on see more button click
    $(document).on("click", "header button.see-more-btn", function () {
        var section = $('#popularHeader').find('.extra');
        if ($(section).css('display') === "none") {
            $(section).show("blind", 500);
            $(this).text("See Less");
        } else {
            $(section).hide("blind", 500);
            $(this).text("See More Articles");
        }
    });

    // Sort the articles by relevance, newest or older for a category when the select element is changed
    $('#sortBySelect').on('change', function () {
        var url = "";
        var section = "";
        var active_tab = $("#categoryArticles").tabs('option', 'active');
		console.log(active_tab);
        if (active_tab === 0) {
            url = "https://content.guardianapis.com/search?section=sport&show-blocks=all&order-by=" + this.value + "&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98";
            section = "sport"
        } else if (active_tab === 1) {
            url = "https://content.guardianapis.com/search?section=technology&show-blocks=all&order-by=" + this.value + "&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98";
            section = "tech"
        } else if (active_tab === 2) {
            url = "https://content.guardianapis.com/search?section=politics&show-blocks=all&order-by=" + this.value + "&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98";
            section = "politics"
        } else if (active_tab === 3) {
            url = "https://content.guardianapis.com/search?section=science&show-blocks=all&order-by=" + this.value + "&api-key=ae2f8afa-f8d7-4d7e-831c-07249c969e98";
            section = "science"
        }
        loadJsonData(url, section);
    })

});