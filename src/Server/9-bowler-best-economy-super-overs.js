//Find the bowler with the best economy in super overs


const fs=require('fs');
const deliverData = require('../Data/deliver.json');




let result={};

deliverData.forEach((delivery)=>{
    let id=delivery.match_id;
    let is_super_over=delivery.is_super_over;
    if(is_super_over=="0") return ;

        let bowler=delivery.bowler;
        let runs=parseInt(delivery.total_runs);

        if(result.hasOwnProperty(bowler)){
            result[bowler].runs+=runs;
            result[bowler].balls+=1;

        }
        else{
            result[bowler]={
                "runs":runs,
                "balls":1,
            }
        }
    

});

console.log(result);


let best_player=null;
let best_economy=Number.MAX_VALUE;

for(let player_key in result){
    let runs=result[player_key].runs;
    let balls=result[player_key].balls;
    let overs=(balls/6);
    let economy=runs/overs;
    if(best_economy>economy){
        best_economy=economy;
        best_player=player_key;
    }
}


let result_ans={
    'best_player':best_player,
    "best_economy":best_economy,
}

console.log( result_ans)


 let jsonResult = JSON.stringify(result_ans, null, 2);
 
 
  fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/9-bowler-best-economy-super-overs.js',jsonResult,'utf8')





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