// Find the highest number of times one player has been dismissed by another player

const { count } = require("yargs");
const deliverData = require("../Data/deliver.json");

const fs = require("fs");

let playersData = getDataPlayerDismmisedByOther(deliverData);

let resultPlayer = getHighestDismmised(playersData);

function getDataPlayerDismmisedByOther(deliverData) {
  return deliverData.reduce((acc, delivery) => {
    let player_dismissed = delivery.player_dismissed;
    if (
      player_dismissed == null ||
      player_dismissed == "" ||
      delivery.dismissal_kind === "run out"
    )
      return acc;
    let dismissed_by = delivery.bowler;

    if (!acc.hasOwnProperty(player_dismissed)) {
      acc[player_dismissed] = {};
    }

    let player_map = acc[player_dismissed];

    if (player_map.hasOwnProperty(dismissed_by)) {
      player_map[dismissed_by] += 1;
    } else {
      player_map[dismissed_by] = 1;
    }
    return acc;
  }, {});
}

function getHighestDismmised(playersData) {
  let max_value = 0;
  let dismissed_by = null;
  let most_player = null;

  for (let player_key in playersData) {
    let player = playersData[player_key];
    for (let bowler in player) {
      let value = player[bowler];
      if (value > max_value) {
        most_player = player_key;
        max_value = value;
        dismissed_by = bowler;
      }
    }
  }
  return {
    [most_player]: {
      dismissed_by: dismissed_by,
      count: max_value,
    },
  };
}

let jsonResult = JSON.stringify(resultPlayer, null, 2);
fs.writeFileSync(
  "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/8-dismmesd-by.json",
  jsonResult,
  "utf8"
);
