// Find a player who has won the highest number of Player of the Match awards for each season

const matchData = require("../Data/matches.json");

const fs = require("fs");

let playerOfMatchdataEachYear = getPlayerOfTheMatchEachYear(matchData);

let result = Object.entries(playerOfMatchdataEachYear).reduce(
    (acc, [keyword, value]) => {
      let player = getHighestScorePlayer(value);
      acc.push({ [keyword]: player });
      return acc;
    },
    []
  );

function getPlayerOfTheMatchEachYear(matchData) {
  return matchData.reduce((acc, match) => {
    let year = match.season;
    if (!acc.hasOwnProperty(year)) {
      acc[year] = {};
    }

    let player_of_match = match.player_of_match;
    if (player_of_match === null) return acc;
    let years_store = acc[year];

    addPlayerResultInYear(player_of_match, years_store);
    return acc;
  }, {});
}

function addPlayerResultInYear(player_of_match, years_store) {
  if (years_store.hasOwnProperty(player_of_match)) {
    years_store[player_of_match] += 1;
  } else {
    years_store[player_of_match] = 1;
  }
}

function getHighestScorePlayer(players) {
  let maxScore = 0;
  let winner = null;
    let playersKey=Object.keys(players);

    return  playersKey.reduce((acc,key)=>{
        let score=players[key];
        if (maxScore < score) {
          acc = [];
          maxScore = score;
          winner = key;
          acc.push({
            name: winner,
            playerMatchCount: maxScore,
          });
          return acc;
        }
        if (maxScore== score) {
          maxScore = score;
          winner = key;
          acc.push({
            name: winner,
            playerMatchCount: maxScore,
          });
        }
        return acc;

     },[]);

}

let jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync(
  "../Public/output/6-highest-number-of-Player-of-the-Match.json",
  jsonResult,
  "utf8"
);
