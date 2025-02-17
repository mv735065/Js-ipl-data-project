// Top 10 economical bowlers in the year 2015

const fs = require("fs");
const deliverData = require("../Data/deliver.json");
const matchData = require("../Data/matches.json");

let match_ids_2015 = matchData
  .filter((match) => match.season === "2015")
  .map((match) => match.id);

let bowlersDataEachYear = addBowlersDataEachYearWithBallsRuns(
  deliverData,
  match_ids_2015
);

let sortedResult = addEconomyAndSortIt(bowlersDataEachYear);

sortedResult = sortedResult.slice(0, 10);

function addBowlersDataEachYearWithBallsRuns(deliverData, match_ids_2015) {
  return deliverData.reduce((acc, delivery) => {
    let id = delivery.match_id;
    if (!match_ids_2015.includes(id)) return acc;

    let bowler = delivery.bowler;
    let runs =
      parseInt(delivery.batsman_runs) +
      parseInt(delivery.wide_runs) +
      parseInt(delivery.noball_runs);

    if (!acc.hasOwnProperty(bowler)) {
      acc[bowler] = {
        runs: 0,
        balls: 0,
      };
    }
    acc[bowler].runs += runs;
    if (
      parseInt(delivery.wide_runs) === 0 &&
      parseInt(delivery.noball_runs) === 0
    )
      acc[bowler].balls += 1;
    return acc;
  }, {});
}

function addEconomyAndSortIt(bowlersDataEachYear) {
  let store = Object.entries(bowlersDataEachYear);

  store.forEach((result) => {
    let value = result[1];
    let balls = value.balls;
    let overs = balls / 6;
    let runs = value.runs;

    let economy = (runs / overs).toFixed(3);
    value.economy = parseFloat(economy);
  });

  store.sort((a, b) => {
    let economy1 = a[1].economy;
    let economy2 = b[1].economy;
    return economy1 - economy2;
  });

  return store;
}

let jsonResult = JSON.stringify(sortedResult, null, 2);
fs.writeFileSync(
  "../Public/output/4-top-10-economical-bowlers-2015.json",
  jsonResult,
  "utf8"
);
