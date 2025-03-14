// Number of matches won per team per year in IPL.

const matchData = require("../Data/matches.json");

const fs = require("fs");

let matchesWon = getMatchesWonPerTeam(matchData);

function getMatchesWonPerTeam(matchData) {
  return matchData.reduce((acc, match) => {
    let year = match.season;
    if (!acc.hasOwnProperty(year)) {
      acc[year] = {};
    }
    let winner = match.winner;
    if (winner == null) winner = "No-result";

    let obj = acc[year];
    if (!obj.hasOwnProperty(winner)) {
      obj[winner] = 1;
    } else {
      obj[winner] += 1;
    }

    return acc;
  }, {});
}

let jsonResult = JSON.stringify(matchesWon, null, 2);

fs.writeFileSync(
  "../Public/output/2-matches-won-per-team-per-year.json",
  jsonResult,
  "utf8"
);
