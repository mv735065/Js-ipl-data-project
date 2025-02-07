// Number of matches won per team per year in IPL.
const matchData = require('../Data/matches.json');

const fs=require('fs')

 let map=new Map();

   matchData.forEach((match)=>{
    let year=match.season;
    if(!map.has(year)){
        map.set(year,{});
    }
    let team1=match.team1;
    let team2=match.team2;
     
    let winner=match.winner;

    let obj=map.get(year);
    if(!obj.hasOwnProperty(winner)){
        obj[winner]=1;
    }
    else{
        obj[winner]+=1;
    }
 });

 console.log(map);
 
  let result = Object.fromEntries(map);
 
 let jsonResult = JSON.stringify(result, null, 2);
 
 
  fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/matches-won-per-team-per-year.json',jsonResult,'utf8')


