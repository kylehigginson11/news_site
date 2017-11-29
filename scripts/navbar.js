// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    $('#clearInputButton').click(function () {
        $('#input').val("");
    });

    $('nav p.help-toggle > a').click(function () {
        $('[data-toggle="popover"]').popover('toggle');
    });
	
    $("header nav li a").click(function () {
		var tab = $(this).data('target')
		$("#categoryArticles").tabs( "option", "active", tab ); 
        var section = $("#categoryArticles");
        $('html, body').animate({
            scrollTop: section.offset().top - 60
        }, 2000);
    });
	
});
