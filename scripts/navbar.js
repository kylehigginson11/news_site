// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    // clear the text in input search field when clear button is clicked
    $('#clearInputButton').click(function () {
        $('#input').val("");
    });

    // toggle the pop overs for support on search functionality
    $('nav p.help-toggle > a').click(function () {
        if ($('.popover').css('opacity') === "1") {
            $('[data-toggle="popover"]').popover('hide');
        } else {
            $('[data-toggle="popover"]').popover('show');
        }
    });

    // click handle buttons in the nav bar
    $("header nav li > a").click(function () {
        var tab = $(this).data('target');
        var section = $("#" + tab);
        $('html, body').animate({
            scrollTop: section.offset().top - 60
        }, 2000);
        $("header nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

    // sports centre drop down menu event handler, load whichever league is clicked and scroll to football centre
    $('#footballDropdown').find('.dropdown-menu a').click(function () {
        var league = $(this).data('target');
        if (league === 445) {
            $('#footballCentre').find('nav .nav-link:nth-of-type(1)').addClass("active").siblings().removeClass("active");
        } else if (league === 455) {
            $('#footballCentre').find('nav .nav-link:nth-of-type(2)').addClass("active").siblings().removeClass("active");
        } else {
            $('#footballCentre').find('nav .nav-link:nth-of-type(3)').addClass("active").siblings().removeClass("active");
        }
        loadLeagueTable(league);
        loadFixtures(league, 1);
        var section = $('#footballCentre');
        $('html, body').animate({
            scrollTop: section.offset().top - 60
        }, 2000);
        $("header nav").find(".active").removeClass("active");
        $('#footballDropdown').addClass("active");
    });

    // sports centre drop down menu event handler, load whichever league is clicked and scroll to football centre
    $('#categoryDropdown').find('.dropdown-menu a').click(function () {
        var tab = $(this).data('target');
        // toggle jQueryUI tab
        var section = $("#categoryArticles");
        section.tabs("option", "active", tab);
        $('html, body').animate({
            scrollTop: section.offset().top - 60
        }, 2000);
        $("header nav").find(".active").removeClass("active");
        $('#categoryDropdown').addClass("active");
    })

});
