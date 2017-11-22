// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {
    /*
     This controls the buttons in the navigation bar, by selecting the button in the header
     which are siblings of the tab class. Again, using the data-target value, scroll to the div with ID matching
     data-target.
     */
    $("header nav li a").click(function () {
        var section = $("#" + $(this).data('target'));
        $('html, body').animate({
            scrollTop: section.offset().top
        }, 2000);
    });

    // show extra articles for recent and popular articles
    $(document).on("click", "header button.see-more-btn", function () {
        var target = "#" + $(this).data("target");
        var section = $(target + '.row .extra');
        if ($(section).css('display') === "none") {
            $(section).show("slide", {direction: "left"}, 1000);
            $(this).text("See Less");
        } else {
            $(section).hide("slide", {direction: "left"}, 1000);
            $(this).text("See More");
        }
    });

});