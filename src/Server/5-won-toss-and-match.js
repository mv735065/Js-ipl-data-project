// Find the number of times each team won the toss and also won the match

const matchData = require("../Data/matches.json");

const fs = require("fs");

let teamsWonBoth = matchData.reduce((acc,match) => {
    let toss_winner = match.toss_winner;
    let match_winner = match.winner;

    if (toss_winner !== match_winner) return acc;

    if (!acc.hasOwnProperty(match_winner)) {
        acc[match_winner] = 0;
    }
    acc[match_winner] += 1;
    return acc;
},{});

let jsonResult = JSON.stringify(teamsWonBoth, null, 2);

fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/5-won-toss-and-match.json', jsonResult, 'utf8')
