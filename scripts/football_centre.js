function loadGameWeeks() {
    var match_days = 39;
    for (var i = 1; i < match_days; i++) {
        $('#gameWeekSelect').append($('<option>', {
            value: i,
            text: "Game Week " + i
        }));
    }
}

function loadFixtures(league, gameWeek) {
    var url = "https://api.football-data.org/v1/competitions/" + league + "/fixtures?matchday=" + gameWeek;
    var leagueName = $('#footballCentre').find('nav .nav-link.active').text();
    $('#fixturesSection').find('h1').text(leagueName + " Week " + gameWeek + " Fixtures");
    $('#fixturesSection').find('table tbody:last-child').find("tr:gt(0)").remove();
    $.ajax({
        type: 'GET',
        headers: {'X-Auth-Token': 'eef44c20bd9e468597d2c7c85d88eb46'},
        url: "sample_data/fixtures.json",
        dataType: 'json',
        success: function (data) {
            var fixtures_array = data['fixtures'];
            $.each(fixtures_array, function (index, value) {
                var home_team = value["homeTeamName"];
                if (value["status"] === "SCHEDULED") {
                    var home_score = " ";
                    var away_score = " ";
                } else {
                    var home_score = value["result"]["goalsHomeTeam"];
                    var away_score = value["result"]["goalsAwayTeam"];
                }

                var away_team = value["awayTeamName"];
                $('#fixturesSection').find('table tbody:last-child').append("<tr><td>" + home_team +
                    "</td><td>" + home_score + "</td>"
                    + "<td>vs</td>"
                    + "<td>" + away_score + "</td><td>"
                    + away_team + "</td></tr>");
            });
        },
        error: function () {
            console.log("Error");
        }
    });
}

function loadLeagueTable(league) {
    //var url = "https://api.football-data.org/v1/competitions/" + league + "/leagueTable";
    var leagueName = $('#footballCentre').find('nav .nav-link.active').text();
    $('#leagueTableSection').find('h1').text(leagueName + " Table");
    $('#leagueTableSection').find('table tbody:last-child').find("tr:gt(0)").remove();
    $.ajax({
        type: 'GET',
        headers: {'X-Auth-Token': 'eef44c20bd9e468597d2c7c85d88eb46'},
        url: "sample_data/prem_table.json",
        dataType: 'json',
        success: function (data) {
            var standings_array = data['standing'];
            $.each(standings_array, function (index, value) {
                var position = value["position"];
                var team = value["teamName"];
                var played = value["playedGames"];
                var won = value["wins"];
                var drawn = value["draws"];
                var lost = value["losses"];
                var difference = value["goalDifference"];
                var points = value["points"];
                $('#leagueTableSection').find('table tbody:last-child').append("<tr><td>" + position + "</td><td>"
                    + team + "</td><td>"
                    + played + "</td><td>"
                    + won + "</td><td>"
                    + drawn + "</td><td>"
                    + lost + "</td><td>"
                    + difference + "</td><td>"
                    + points + "</td></tr>");
            });
        },
        error: function () {
            console.log("Errro");
        }
    });
}

// Wait for DOM objects to be loaded, then load popular news stories
$(document).ready(function () {

    $(function () {
        $('#footballCentre').tabs({active: '#fixturesSection'})
        $("#gameWeekSpinner").spinner();
    });

    loadGameWeeks();
    loadFixtures(445, 1);
    loadLeagueTable(445);

    $('#footballCentre').find('nav .nav-link').click(function () {
        var league = $(this).data('target');
        $(this).addClass("active").siblings().removeClass("active");
        loadLeagueTable(league);
        loadFixtures(league, 1);
    });

    $('#submitGameWeek').click(function () {
        var week = $('#gameWeekSpinner').val();
        var league = $('#footballCentre').find('nav .nav-link.active').data('target');
        loadFixtures(league, week);
    })

    $('#footballCentre').find('ul li a').click(function () {
        console.log("hellooo");
        $('#gameWeekForm').toggle();
    });

    $('.dropdown-menu a').click(function () {
        var league = $(this).data('target');
        if (league === 445) {
            $('#footballCentre').find('nav .nav-link:nth-of-type(1)').addClass("active").siblings().removeClass("active");
        } else if (league === 455) {
            $('#footballCentre').find('nav .nav-link:nth-of-type(2)').addClass("active").siblings().removeClass("active");
        } else {
            $('#footballCentre').find('nav .nav-link:nth-of-type(3)').addClass("active").siblings().removeClass("active");
        }
        $(this).addClass("active").siblings().removeClass("active");
        loadLeagueTable(league);
        loadFixtures(league, 1);
        var section = $('#footballCentre');
        $('html, body').animate({
            scrollTop: section.offset().top - 60
        }, 2000);
    })


});