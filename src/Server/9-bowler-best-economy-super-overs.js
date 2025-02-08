//Find the bowler with the best economy in super overs

const fs = require("fs");
const deliverData = require("../Data/deliver.json");

let result = {};

deliverData.forEach((delivery) => {
    let id = delivery.match_id;
    let is_super_over = delivery.is_super_over;
    if (is_super_over == "0") return;

    let bowler = delivery.bowler;
    let runs = parseInt(delivery.total_runs);

    if (!result.hasOwnProperty(bowler)) {
        result[bowler] = {
            runs: 0,
            balls: 0,
        };
    }
    result[bowler].runs += runs;
    result[bowler].balls += 1;
});


let player = getBestPlayerWithEconomy();

let jsonResult = JSON.stringify(player, null, 2);


function getBestPlayerWithEconomy() {
    let best_player = null;
    let best_economy = Number.MAX_VALUE;

    let store = [];

    for (let player_key in result) {

        let runs = result[player_key].runs;
        let balls = result[player_key].balls;
        let overs = balls / 6;
        let economy = runs / overs;

        if (best_economy > economy) {
            store = [];
            best_economy = economy;
            best_player = player_key;
            store.push({
                best_player: best_player,
                economy: best_economy,
            })
            continue;
        }
        if (best_economy == economy) {
            store.push({
                best_player: player_key,
                economy: economy,
            })
        }
    }

    return store;
}

fs.writeFileSync(
    "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/9-bowler-best-economy-super-overs.json",
    jsonResult,
    "utf8"
);
