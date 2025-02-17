//Find the bowler with the best economy in super overs

const fs = require("fs");
const deliverData = require("../Data/deliver.json");

let bowlersData = getBowlersDataOfSuperOver(deliverData);

let player = getBestPlayerWithEconomy(bowlersData);

let jsonResult = JSON.stringify(player, null, 2);

function getBowlersDataOfSuperOver(deliverData) {
  return deliverData.reduce((acc, delivery) => {
    let id = delivery.match_id;
    let is_super_over = delivery.is_super_over;
    if (is_super_over == "0") return acc;

    let bowler = delivery.bowler;
    let runs = parseInt(delivery.total_runs);

    if (!acc.hasOwnProperty(bowler)) {
      acc[bowler] = {
        runs: 0,
        balls: 0,
      };
    }
    acc[bowler].runs += runs;
    acc[bowler].balls += 1;
    return acc;
  }, {});
}

function getBestPlayerWithEconomy(bowlersData) {
  let best_player = null;
  let best_economy = Number.MAX_VALUE;

  let store = Object.keys(bowlersData).reduce((acc, player_key) => {
    let runs = bowlersData[player_key].runs;
    let balls = bowlersData[player_key].balls;
    let overs = balls / 6;
    let economy = runs / overs;

    if (best_economy > economy) {
      acc = [];
      best_economy = economy;
      best_player = player_key;
      acc.push({
        best_player: best_player,
        economy: best_economy,
      });
      return acc;
    }
    if (best_economy == economy) {
      acc.push({
        best_player: player_key,
        economy: economy,
      });
    }
    return acc;
  }, []);

  return store;
}

fs.writeFileSync(
  "../Public/output/9-bowler-best-economy-super-overs.json",
  jsonResult,
  "utf8"
);
