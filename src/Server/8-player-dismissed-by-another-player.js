// Find the highest number of times one player has been dismissed by another player

const { count } = require("yargs");
const deliverData = require("../Data/deliver.json");

const fs = require("fs");

let map = new Map();

deliverData.forEach((delivery) => {
    let player_dismissed = delivery.player_dismissed;
    if (player_dismissed == null || player_dismissed == "") return;
    let dismissed_by = delivery.bowler;

    if (delivery.fielder !== "") {
        dismissed_by = delivery.fielder;
    }

    if (!map.has(player_dismissed)) {
        map.set(player_dismissed, new Map());
    }

    let player_map = map.get(player_dismissed);
    if (player_map.has(dismissed_by)) {
        player_map.set(dismissed_by, player_map.get(dismissed_by) + 1);
    } else {
        player_map.set(dismissed_by, 1);
    }
});

let max_value = 0;
let dismissed_by = null;
let player = null;

map.forEach((player_map, key) => {
    player_map.forEach((value, player_dismissed_by) => {
        if (value > max_value) {
            player = key;
            max_value = value;
            dismissed_by = player_dismissed_by;

        }
    });
});

let store = {
    [player]: {
        bowler: dismissed_by,
        count: max_value,
    },
};

let jsonResult = JSON.stringify(store, null, 2);
fs.writeFileSync(
    "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/8-dismmesd-by.json",
    jsonResult,
    "utf8"
);

console.log(max_value, player, dismissed_by);
// console.log(map)
