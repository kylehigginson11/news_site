// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    //$('[data-toggle="popover"]').popover('toggle');

    $('#clearInputButton').click(function () {
        $('#input').val("");
    });

    $('nav p > a').click(function () {
        $('[data-toggle="popover"]').popover('toggle');
    })
});
