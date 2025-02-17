// Find the number of times each team won the toss and also won the match

const matchData = require("../Data/matches.json");

const fs = require("fs");

let teamsWonBoth = getTeamsWonBothTossAndMatch(matchData);

function getTeamsWonBothTossAndMatch(matchData) {
  return matchData.reduce((acc, match) => {
    let toss_winner = match.toss_winner;
    let team = match.winner;

    if (toss_winner !== team) return acc;

    if (!acc.hasOwnProperty(team)) {
      acc[team] = 0;
    }
    acc[team] += 1;
    return acc;
  }, {});
}

let jsonResult = JSON.stringify(teamsWonBoth, null, 2);

fs.writeFileSync(
  "../Public/output/5-won-toss-and-match.json",
  jsonResult,
  "utf8"
);
