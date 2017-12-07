// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    $('#clearInputButton').click(function () {
        $('#input').val("");
    });

    $('nav p.help-toggle > a').click(function () {
        if ($('.popover').css('opacity') === "1") {
            $('[data-toggle="popover"]').popover('hide');
        } else {
            $('[data-toggle="popover"]').popover('show');
        }
    });

    $("header nav li > a").click(function () {
        var tab = $(this).data('target');
        // toggle jQueryUI tab
        $("#categoryArticles").tabs("option", "active", tab);
        var section = $("#categoryArticles");
        if (tab === "footballCentre" || tab === "newsHeader") {
            section = $("#" + tab);
        }
        $('html, body').animate({
            scrollTop: section.offset().top - 60
        }, 2000);
        $("header nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

});
