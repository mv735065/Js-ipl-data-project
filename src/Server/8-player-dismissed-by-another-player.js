// Find the highest number of times one player has been dismissed by another player

const deliverData = require("../Data/deliver.json");

const fs = require("fs");


let playersData = getDataPlayerDismmisedByOther(deliverData);

let resultPlayer = getHighestDismmised(playersData);

let jsonResult = JSON.stringify(resultPlayer, null, 2);

fs.writeFileSync(
    "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/8-dismmesd-by.json",
    jsonResult,
    "utf8"
);



function getDataPlayerDismmisedByOther(deliverData) {

    let store = {};
    for (let delivery of deliverData) {

        let player_dismissed = delivery.player_dismissed;
        if ( player_dismissed == "" || !player_dismissed || delivery.dismissal_kind==="run out") continue;
        let dismissed_by = delivery.bowler;

        if (!store.hasOwnProperty(player_dismissed)) {
            store[player_dismissed] = {};
        }

        let player_map = store[player_dismissed];
        if (!player_map.hasOwnProperty(dismissed_by)) {
            player_map[dismissed_by] = 1;
        }
        else{
            player_map[dismissed_by] += 1;
        }
     
    }
    return store;
}


function getHighestDismmised(playersData) {

    let max_value = 0;
    let dismissed_by = null;
    let player = null;

    for (let key in playersData) {
        let player_map = playersData[key];

        for (let player_dismissed_by in player_map) {
            let value = player_map[player_dismissed_by];

            if (value > max_value) {
                player = key;
                max_value = value;
                dismissed_by = player_dismissed_by;

            }
        }
    }

    console.log(max_value, player, dismissed_by);

    return {
        [player]: {
            bowler: dismissed_by,
            count: max_value,
        },
    };

}
