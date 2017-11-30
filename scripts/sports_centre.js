function loadGameWeeks() {
    var match_days = 39;
    for (var i = 1; i < match_days; i++) {
        $('#gameWeekSelect').append($('<option>', {
            value: i,
            text: "Game Week " + i
        }));
    }
}

function loadFixtures(league, matchDay) {
    var url = "http://api.football-data.org/v1/competitions/" + league + "/fixtures?matchday=" + matchDay;
    $('#fixturesSection').find('table tbody:last-child').find("tr:gt(0)").remove();
    $.ajax({
        type: 'GET',
        headers: {'X-Auth-Token': 'eef44c20bd9e468597d2c7c85d88eb46'},
        url: 'sample_data/fixtures.json',
        dataType: 'json',
        success: function (data) {
            var fixtures_array = data['fixtures'];
            $.each(fixtures_array, function (index, value) {
                var home_team = value["homeTeamName"];
                var home_score = value["result"]["goalsHomeTeam"];
                var away_score = value["result"]["goalsAwayTeam"];
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
    var url = "http://api.football-data.org/v1/competitions/" + league + "/leagueTable";
    $('#leagueTableSection').find('table tbody:last-child').find("tr:gt(0)").remove();
    $.ajax({
        type: 'GET',
        headers: {'X-Auth-Token': 'eef44c20bd9e468597d2c7c85d88eb46'},
        url: 'sample_data/prem_table.json',
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
        $('#sportsCentre').tabs({active: '#fixturesSection'})
        $("#gameWeekSpinner").spinner();
    });

    loadLeagueTable(445);
    loadGameWeeks();
    loadFixtures(445, 1);

    $('#sportsCentre').find('nav .nav-link').click(function () {
        var league = $(this).data('target');
        $(this).addClass("active").siblings().removeClass("active");
        loadLeagueTable(league);
        loadFixtures(league, 1);
    });
    
    $('#submitGameWeek').click(function () {
        var week = $('#gameWeekSpinner').val();
        var league = $('#sportsCentre').find('nav .nav-link.active').data('target');
        loadFixtures(league, week);
    })


});