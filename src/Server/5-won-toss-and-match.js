// Find the number of times each team won the toss and also won the match


const matchData = require('../Data/matches.json');

const fs=require('fs')

let map=new Map();


matchData.forEach((match)=>{
    let toss_winner=match.toss_winner;
    let match_winner=match.winner;
    if(toss_winner===match_winner){
    if(map.has(match_winner)){
       map.set(match_winner,map.get(match_winner)+1);
    }else{
        map.set(match_winner,1);
    }
}

 });

 console.log(map);

 let res=Object.fromEntries(map);
 let jsonResult=JSON.stringify(res);


 fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/5-won-toss-and-match.json',jsonResult,'utf8')