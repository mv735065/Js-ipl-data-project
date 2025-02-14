// Find a player who has won the highest number of Player of the Match awards for each season

const matchData = require("../Data/matches.json");

const fs = require("fs");


let playersData = getCountEachPlayerWon(matchData);

let playerPerSeason = getMaximumOwnPlayerPerSeason(playersData);


let jsonResult = JSON.stringify(playerPerSeason, null, 2);

fs.writeFileSync(
    "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/6-highest-number-of-Player-of-the-Match.json",
    jsonResult,
    "utf8"
);

function getCountEachPlayerWon(matchData) {

    let store = {};

    for (let match of matchData) {
        let year = match.season;
        if (!store.hasOwnProperty(year)) {
            store[year] = {};
        }

        let player_of_match = match.player_of_match;
        let years_store = store[year];

        add_player_result_in_year(player_of_match, years_store);
    };
    return store;
}

function getMaximumOwnPlayerPerSeason(playersData) {
    let store = [];
    for (let key in playersData) {
        let year = key;
        let players = playersData[year];
        let player = get_highest_score_player(players);
        store.push({ [year]: player });
    }
    return store;
}


function add_player_result_in_year(player_of_match, years_store) {
    if (years_store.hasOwnProperty(player_of_match)) {
        years_store[player_of_match] += 1;
    } else {
        years_store[player_of_match] = 1;
    }
}

function get_highest_score_player(players) {
    let store = [];
    let score = 0;
    let winner = null;

    for (let playerKey in players) {
        if (players[playerKey] > score) {
            store = [];
            score = players[playerKey];
            winner = playerKey;
            store.push({
                name: winner,
                playerMatchCount: score,
            });
            continue;
        }
        if (players[playerKey] == score) {
            score = players[playerKey];
            winner = playerKey;
            store.push({
                name: winner,
                playerMatchCount: score,
            });
        }
    }
    return store;
}



