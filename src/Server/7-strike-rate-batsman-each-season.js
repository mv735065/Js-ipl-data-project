// Find the strike rate of a batsman for each season

const matchData = require("../Data/matches.json");
const deliverData = require("../Data/deliver.json");

const fs = require("fs");

let map_ids_to_season = new Map();

matchData.forEach((match) => {
   let season = match.season;
   let id = match.id;

   map_ids_to_season.set(id, season);
});

let map_season_batters = new Map();

deliverData.forEach((delivery) => {
   let match_id = delivery.match_id;
   let season = map_ids_to_season.get(match_id);
   if (!map_season_batters.has(season)) {
      map_season_batters.set(season, {});
   }

   add_batter_results(
      delivery.batsman,
      parseInt(delivery.batsman_runs),
      map_season_batters.get(season)
   );
});

let store_batsman_strikeRate = {};

add_strike_rate();

function add_strike_rate() {
   map_season_batters.forEach((value, key) => {
      let season = key;

      let obj = {};

      for (let batsman_key in value) {
         let player = value[batsman_key];
         let strike_rate = ((player.runs / player.balls) * 100).toFixed(2);
         player["strike_rate"] = parseFloat(strike_rate)
         obj[batsman_key] = player["strike_rate"];
      }
      store_batsman_strikeRate[season] = obj;
   });
}

function add_batter_results(batsman, runs, players) {
   if (players.hasOwnProperty(batsman)) {
      players[batsman].runs += runs;
      players[batsman].balls += 1;
   } else {
      players[batsman] = {
         runs: runs,
         balls: 1,
      };
   }
}

console.log(store_batsman_strikeRate);

let jsonResult = JSON.stringify(store_batsman_strikeRate, null, 4);

fs.writeFileSync(
   "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/7-strike-rate-batsman-each-season.json",
   jsonResult,
   "utf8"
);
