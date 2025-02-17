// Find the strike rate of a batsman for each season

const matchData = require("../Data/matches.json");
const deliverData = require("../Data/deliver.json");

const fs = require("fs");

let mapidsToSeason = matchData.reduce((acc, match) => {
  let season = match.season;
  let id = match.id;
  acc.set(id, season);
  return acc;
}, new Map());

let batsmanRunsPerSeason = getBatsmanRunsPerSeason(mapidsToSeason, deliverData);

let storeBatsmanStrikeRate = addStrikeRate(batsmanRunsPerSeason);

function getBatsmanRunsPerSeason(mapidsToSeason, deliverData) {
  return deliverData.reduce((acc, delivery) => {
    let match_id = delivery.match_id;
    let season = mapidsToSeason.get(match_id);
    if (!acc.hasOwnProperty(season)) {
      acc[season] = {};
    }
    let players = acc[season];
    let batsman = delivery.batsman;
    let runs = parseInt(delivery.batsman_runs);

    if (!players.hasOwnProperty(batsman)) {
      players[batsman] = {
        runs: 0,
        balls: 0,
      };
    }
    players[batsman].runs += runs;
    players[batsman].balls += 1;

    return acc;
  }, {});
}

function addStrikeRate(batsmanRunsPerSeason) {
  let store = {};

  for (let key in batsmanRunsPerSeason) {
    let value = batsmanRunsPerSeason[key];
    let season = key;
    let obj = {};

    for (let batsman_key in value) {
      let player = value[batsman_key];
      let strike_rate = ((player.runs / player.balls) * 100).toFixed(2);
      player["strike_rate"] = parseFloat(strike_rate);
      obj[batsman_key] = player["strike_rate"];
    }
    store[season] = obj;
  }
  return store;
}

let jsonResult = JSON.stringify(storeBatsmanStrikeRate, null, 4);

fs.writeFileSync(
  "../Public/output/7-strike-rate-batsman-each-season.json",
  jsonResult,
  "utf8"
);
