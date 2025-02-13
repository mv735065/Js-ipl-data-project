// Top 10 economical bowlers in the year 2015

const fs = require("fs");
const deliverData = require("../Data/deliver.json");
const matchData = require("../Data/matches.json");

let match_ids_2015 = getIdsOf2015(matchData);


let bowlersData = getEachBowlerData(deliverData);

let bowlersWithEconomy = addBowlersEconomyAndSort(bowlersData);

bowlersWithEconomy = bowlersWithEconomy.slice(0, 10);

let jsonResult = JSON.stringify(bowlersWithEconomy, null, 2);

fs.writeFileSync(
  "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/4-top-10-economical-bowlers-2015.json",
  jsonResult,
  "utf8"
);

function getIdsOf2015(matchData) {
  let ids = [];
  for (let match of matchData) {
    if (match.season === "2015") ids.push(match.id);
  }
  return ids;
}

function getEachBowlerData(deliverData) {
  let store = {};

  for (let delivery of deliverData) {
    let id = delivery.match_id;
    if (!match_ids_2015.includes(id)) continue;

    let bowler = delivery.bowler;
    let runs =
      parseInt(delivery.batsman_runs) +
      parseInt(delivery.wide_runs) +
      parseInt(delivery.noball_runs);


    if (!store.hasOwnProperty(bowler)) {
      store[bowler] = {
        runs: 0,
        balls: 0,
      };
    }
    store[bowler].runs += runs;
    if (
      !(parseInt(delivery.wide_runs) > 0 || parseInt(delivery.noball_runs) > 0)
    )
      store[bowler].balls += 1;
  }
  return store;
}

function addBowlersEconomyAndSort(bowlersData) {
  let sort_result = Object.entries(bowlersData);

  for (let [key, result] of sort_result) {
    let obj = result;
    let balls = obj.balls;
    let overs = balls / 6;
    let runs = obj.runs;

    let economy = (runs / overs).toFixed(3);
    obj.economy = parseFloat(economy);
  }

  sort_result.sort((a, b) => {
    let economy1 = a[1].economy;
    let economy2 = b[1].economy;
    return economy1 - economy2;
  });

  return sort_result;
}
