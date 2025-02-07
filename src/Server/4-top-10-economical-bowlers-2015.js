// Top 10 economical bowlers in the year 2015

// {
//     "match_id": "17",
//     "inning": "2",
//     "batting_team": "Royal Challengers Bangalore",
//     "bowling_team": "Rising Pune Supergiant",
//     "over": "10",
//     "ball": "6",
//     "batsman": "AB de Villiers",
//     "non_striker": "KM Jadhav",
//     "bowler": "DT Christian",
//     "is_super_over": "0",
//     "wide_runs": "0",
//     "bye_runs": "0",
//     "legbye_runs": "0",
//     "noball_runs": "0",
//     "penalty_runs": "0",
//     "batsman_runs": "1",
//     "extra_runs": "0",
//     "total_runs": "1",
//     "player_dismissed": null,
//     "dismissal_kind": null,
//     "fielder": ""
//   },


const fs=require('fs');
const deliverData = require('../Data/deliver.json');
const matchData = require('../Data/matches.json');



let match_ids_2015=matchData.filter((match)=>match.season==='2015').map((match)=>match.id);

let result={};

deliverData.forEach((delivery)=>{
    let id=delivery.match_id;
    if(match_ids_2015.includes(id)){

        let bowler=delivery.bowler;
        let runs=parseInt(delivery.batsman_runs)+parseInt(delivery.wide_runs)+parseInt(delivery.noball_runs);


        if(result.hasOwnProperty(bowler)){
            result[bowler].runs+=runs;
           if(!(parseInt(delivery.wide_runs)>0 || parseInt(delivery.noball_runs)>0)) result[bowler].balls+=1;

        }
        else{
            result[bowler]={
                "runs":runs,
                "balls":0,
            }

            if(!(parseInt(delivery.wide_runs)>0 || parseInt(delivery.noball_runs)>0)) result[bowler].balls=1;
        }
    }

});

let economies=[];
for(let bowlerKey in result){
    let overs=result[bowlerKey].balls/6;
    let economy=(result[bowlerKey].runs/overs)
    economies.push({
        "name":bowlerKey,
        "economy":economy,
    })
}
// console.log(result);

// console.log(economies);

economies.sort((a,b)=>{
    return a.economy-b.economy;
})

console.log(economies);

let top_10={};
for(let index=0;index<10;index++){
    top_10[economies[index].name]=economies[index].economy
    // top_10.push(economies[index].name)
}



 let jsonResult = JSON.stringify(top_10, null, 2);
 
 
  fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/4-top-10-economical-bowlers-2015.json',jsonResult,'utf8')








