// Extra runs conceded per team in the year 2016

const matchData = require("../Data/matches.json");
const deliverData = require("../Data/deliver.json");
const fs = require("fs");

let ids_2016 = getIdsOf2016(matchData);


function getIdsOf2016(matchData){
    let ids=[];
    for(let match of matchData){
        if(match.season ==='2016') ids.push(match.id);
    }
    return ids;
}


let runsPerTeam = getRunsPerTeam(deliverData);

function getRunsPerTeam(deliverData){
    let store={};

     for(let delivery of deliverData) {
        let id = delivery.match_id;
    
        if (!ids_2016.includes(id)) continue;
    
        let runs = parseInt(delivery.extra_runs);
        let bowling_team = delivery.bowling_team;
    
        if (!store.hasOwnProperty(bowling_team)) {
            store[bowling_team] = 0;
        }
        store[bowling_team] += runs;
    };
    
    return store;

}
console.log(runsPerTeam);



let jsonResult = JSON.stringify(runsPerTeam, null, 2);

fs.writeFileSync(
    "/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/3-runs-conceded-per-team-2016.json",
    jsonResult,
    "utf8"
);
