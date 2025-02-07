// Extra runs conceded per team in the year 2016

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

const matchData = require('../Data/matches.json');
const deliverData = require('../Data/deliver.json');
const fs=require('fs')

let ids=matchData.filter((match)=>match.season==='2016').map((match)=>match.id);

console.log(2016 , ids.length);

let map=new Map();

deliverData.forEach((ball)=>{
    let id=ball.match_id;
    let runs=parseInt(ball.extra_runs);
    if(ids.includes(id)){
        let bowling_team=ball.bowling_team;
        if(map.has(bowling_team)){
            map.set(bowling_team,map.get(bowling_team)+runs);
        }
        else{
            map.set(bowling_team,runs);
        }
    }

});


console.log(map)

  let result = Object.fromEntries(map);
 
 let jsonResult = JSON.stringify(result, null, 2);
 
 
  fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/3-runs-conceded-per-team-2016.json',jsonResult,'utf8')







// function getNearIndex(){
//     let len=deliverData.length;
//     let right=len-1;
//     let left=0;
//     let ans=-1;

//     while (left <= right) {
       

//         let mid = Math.floor((left + right) / 2);
//         let obj = deliverData[mid];
//         console.log(obj);

//         let objId = parseInt(obj.id);  
//         let tarId = parseInt(tar); 
    
//         if (objId === tarId) {
//             ans = mid;
//             right = mid - 1;
//         } 
//         else if (objId < tarId) {
//             left = mid + 1;
//         } 
//         else {
//             right = mid - 1;
//         }
//     }
//     return ans;

// }

// let index=getNearIndex();


// console.log(index);
// console.log(deliverData[index]);






// console.log(typeof matchData);

