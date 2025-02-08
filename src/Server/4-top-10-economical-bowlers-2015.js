// Top 10 economical bowlers in the year 2015

const fs = require("fs");
const deliverData = require("../Data/deliver.json");
const matchData = require("../Data/matches.json");

let match_ids_2015 = matchData
  .filter((match) => match.season === "2015")
  .map((match) => match.id);

let result = {};

deliverData.forEach((delivery) => {
  let id = delivery.match_id;
  if (!match_ids_2015.includes(id)) return;

  let bowler = delivery.bowler;
  let runs =
    parseInt(delivery.batsman_runs) +
    parseInt(delivery.wide_runs) +
    parseInt(delivery.noball_runs);

  if (!result.hasOwnProperty(bowler)) {
    result[bowler] = {
      runs: 0,
      balls: 0,
    };
  }
  result[bowler].runs += runs;
  if (!(parseInt(delivery.wide_runs) > 0 || parseInt(delivery.noball_runs) > 0))
    result[bowler].balls += 1;
});

let economies = [];
for (let bowlerKey in result) {
  let balls = result[bowlerKey].balls;
  let runs = result[bowlerKey].runs;
  let overs = balls / 6;
  let economy = (runs / overs).toFixed(2);
  economies.push({
    name: bowlerKey,
    balls: balls,
    runs: runs,
    economy: parseFloat(economy),
  });
}

economies.sort((a, b) => {
  return a.economy - b.economy;
});

let top = economies.slice(0, 10);
let jsonResult = JSON.stringify(top, null, 2);
fs.writeFileSync(
  "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/4-top-10-economical-bowlers-2015.json",
  jsonResult,
  "utf8"
);
