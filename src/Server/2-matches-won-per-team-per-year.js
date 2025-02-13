// Number of matches won per team per year in IPL.

const matchData = require('../Data/matches.json');

const fs = require('fs')



let matchesWon =getMatchesWonPerTeam(matchData);


function getMatchesWonPerTeam(matchData){
    let store={};
    for(let match of matchData){
        let year = match.season;

    if (!store.hasOwnProperty(year)) {
        store[year] = {};
    }
    let winner = match.winner;
    if (winner == null) winner = "No-result";


    let obj = store[year]
    if (!obj.hasOwnProperty(winner)) {
        obj[winner] = 1;
    }
    else {
        obj[winner] += 1;
    }

    }
    return store;
}

console.log(matchesWon);


let jsonResult = JSON.stringify(matchesWon, null, 2);


fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/2-matches-won-per-team-per-year.json', jsonResult, 'utf8')


