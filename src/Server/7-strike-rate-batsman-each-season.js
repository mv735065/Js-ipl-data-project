// Find the strike rate of a batsman for each season

const matchData = require("../Data/matches.json");
const deliverData = require("../Data/deliver.json");

const fs = require("fs");
const { log } = require("console");

let mapidsToSeason = getIdsOfEachSeason(matchData);

let batsmanRunsPerSeason = getBattersData(deliverData);

let store_batsman_strikeRate = addStrikeRate(batsmanRunsPerSeason);

let jsonResult = JSON.stringify(store_batsman_strikeRate, null, 4);

fs.writeFileSync(
   "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/7-strike-rate-batsman-each-season.json",
   jsonResult,
   "utf8"
);


function getIdsOfEachSeason(matchData) {
   let store = new Map();
   for (let match of matchData) {
      let season = match.season;
      let id = match.id;
      store.set(id, season);
   }
   return store;
}

function getBattersData(deliverData) {
   let store = {};
   for (let delivery of deliverData) {
      let match_id = delivery.match_id;
      let season = mapidsToSeason.get(match_id);
      if (!store.hasOwnProperty(season)) {
         store[season] = {};
      }
      let players = store[season];
      let batsman = delivery.batsman;
      let runs = parseInt(delivery.batsman_runs);

      if (!players.hasOwnProperty(batsman)) {
         players[batsman] = {
            runs: 0,
            balls: 0,
         }
      }
      players[batsman].runs += runs;
      players[batsman].balls += 1;
   }
   return store;
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
         player["strike_rate"] = parseFloat(strike_rate)
         obj[batsman_key] = player["strike_rate"];
      }
      store[season] = obj;
   }
   return store;
}


