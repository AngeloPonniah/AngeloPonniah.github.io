var players = [];
const curSeason = 2020;


function displayPlayerRows(curPlayers) {
    var rows = [];
    curPlayers.map((item) => {
        const row = `<tr>
        <td>${item.player.id}</td>
        <td>${item.player.firstname} ${item.player.lastname}</td>
        <td>${item.player.age}</td>
        <td><a href="pages/playerStatistics.html?id=${item.player.id}&&season=${curSeason}">View Details</a></td>
         </tr>`
        rows.push(row);

    })

    document.getElementById("topsScorersBody").innerHTML = rows.join('');

}

function displayTopScorers() {
    //fetch top scorers for season 2020
    fetchTopScorers(curSeason).then((response) => {

        players = response.response;
        displayPlayerRows(players);
    })
}


function displayPlayerstats(id, season) {

    fetchPlayerStatistics(id, season).then((response) => {
        const players = response.response;
        const player = players[0].player;
        const stats = players[0].statistics;

        const playerPhoto = `<img src="${player.photo}" alt="${player.firstname}"></img>`;

        //display player photo
        document.getElementById("playerImage").innerHTML = playerPhoto;

                const row = `<tr>
        <td>Id</td>
        <td>${player.id}</td>
        </tr>

        <tr>
        <td>Name</td>
        <td>${player.firstname} ${player.lastname}</td>
        </tr>

        <tr> 
        <td>Age</td>
        <td>${player.age}</td
        </tr>

        <tr> 
        <td>Nationality</td>
        <td>${player.nationality}</td>
        </tr>

        <tr>
        <td>Height</td>
        <td>${player.height}</td>
        </tr>

        <tr>
        <td>Weight</td>
        <td>${player.weight}</td>
        </tr>`

        document.getElementById("playerStatisticsBody").innerHTML = row;

    })

}

async function fetchTopScorers(season) {

    const url = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=39&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd70eb503b7mshb127f03be0d8ca9p1f9fbajsn50dd9ce1055f',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'

        }

    };

    try {

        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error(error);
    }
}



async function fetchPlayerStatistics(id, season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/players?id=${id}&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd70eb503b7mshb127f03be0d8ca9p1f9fbajsn50dd9ce1055f',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }

}

function searchClick(evt) {


    const searchText = document.getElementById("searchInputText").value.toLowerCase();

    if (searchText != '') {
        var filteredPlayers = players.filter((item) => {
            return item.player.firstname.toLowerCase().indexOf(searchText) >= 0 || item.player.lastname.toLowerCase().indexOf(searchText) >= 0
                || (item.player.firstname + ' ' + item.player.lastname).toLowerCase().indexOf(searchText) >= 0
        })
        displayPlayerRows(filteredPlayers);
    }
    else {
        displayPlayerRows(players);
    }


}