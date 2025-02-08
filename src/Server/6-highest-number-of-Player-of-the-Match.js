// Find a player who has won the highest number of Player of the Match awards for each season

const matchData = require("../Data/matches.json");

const fs = require("fs");

let map = new Map();

matchData.forEach((match) => {
  let year = match.season;
  if (!map.has(year)) {
    map.set(year, {});
  }

  let player_of_match = match.player_of_match;
  let years_store = map.get(year);

  add_player_result_in_year(player_of_match, years_store);
});

let result = [];

map.forEach((players, year) => {
  let player = get_highest_score_player(players);
  result.push({ [year]: player });
});

function add_player_result_in_year(player_of_match, years_store) {
  if (years_store.hasOwnProperty(player_of_match)) {
    years_store[player_of_match] += 1;
  } else {
    years_store[player_of_match] = 1;
  }
}

function get_highest_score_player(players) {
  let store = [];
  let score = 0;
  let winner = null;

  for (let playerKey in players) {
    if (players[playerKey] > score) {
      store = [];
      score = players[playerKey];
      winner = playerKey;
      store.push({
        name: winner,
        playerMatchCount: score,
      });
      continue;
    }
    if (players[playerKey] == score) {
      score = players[playerKey];
      winner = playerKey;
      store.push({
        name: winner,
        playerMatchCount: score,
      });
    }
  }
  return store;
}

console.log(result);

let jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync(
  "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/6-highest-number-of-Player-of-the-Match.json",
  jsonResult,
  "utf8"
);
