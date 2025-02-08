// Top 10 economical bowlers in the year 2015

const fs = require("fs");
const deliverData = require("../Data/deliver.json");
const matchData = require("../Data/matches.json");

let match_ids_2015 = matchData
    .filter((match) => match.season === "2015")
    .map((match) => match.id);

let result = {};

deliverData.forEach((delivery) => {
    let id = delivery.match_id;
    if (!match_ids_2015.includes(id)) return;

    let bowler = delivery.bowler;
    let runs =
        parseInt(delivery.batsman_runs) +
        parseInt(delivery.wide_runs) +
        parseInt(delivery.noball_runs);

    if (!result.hasOwnProperty(bowler)) {
        result[bowler] = {
            runs: 0,
            balls: 0,
        };
    }
    result[bowler].runs += runs;
    if (!(parseInt(delivery.wide_runs) > 0 || parseInt(delivery.noball_runs) > 0))
        result[bowler].balls += 1;
});

let sort_result = Object.entries(result);


sort_result.forEach((result) => {
    let obj = result[1];
    let balls = obj.balls;
    let overs = balls / 6;
    let runs = obj.runs;

    let economy = (runs / overs).toFixed(3);
    obj.economy = parseFloat(economy);
});


sort_result.sort((a, b) => {
    let economy1 = a[1].economy;
    let economy2 = b[1].economy;
    return economy1 - economy2;
});

console.log(sort_result);
sort_result = sort_result.slice(0, 10);


let jsonResult = JSON.stringify(sort_result, null, 2);
fs.writeFileSync(
    "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/4-top-10-economical-bowlers-2015.json",
    jsonResult,
    "utf8"
);
