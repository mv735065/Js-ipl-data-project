// Extra runs conceded per team in the year 2016

const matchData = require("../Data/matches.json");
const deliverData = require("../Data/deliver.json");
const fs = require("fs");

let ids_2016 = matchData
  .filter((match) => match.season === "2016")
  .map((match) => match.id);

let runsPerTeam = getRunsConcededPerTeam(deliverData, ids_2016);

function getRunsConcededPerTeam(deliverData, ids_2016) {
  return deliverData.reduce((acc, delivery) => {
    let id = delivery.match_id;

    if (!ids_2016.includes(id)) return acc;

    let runs = parseInt(delivery.extra_runs);
    let bowling_team = delivery.bowling_team;

    if (!acc.hasOwnProperty(bowling_team)) {
      acc[bowling_team] = 0;
    }
    acc[bowling_team] += runs;
    return acc;
  }, {});
}

let jsonResult = JSON.stringify(runsPerTeam, null, 2);

fs.writeFileSync(
  "../Public/output/3-runs-conceded-per-team-2016.json",
  jsonResult,
  "utf8"
);
