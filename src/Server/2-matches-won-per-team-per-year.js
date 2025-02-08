// Number of matches won per team per year in IPL.

const matchData = require('../Data/matches.json');

const fs=require('fs')


 let  matchesWon={};

   matchData.forEach((match)=>{
    let year=match.season;
    
    if(!matchesWon.hasOwnProperty(year)){
          matchesWon[year]={};
    }
     
    let winner=match.winner;
    if(winner==null) winner="No-result"

    let obj=matchesWon[year]
    if(!obj.hasOwnProperty(winner)){
        obj[winner]=1;
    }
    else{
        obj[winner]+=1;
    }
 });

 console.log(matchesWon);
 
 
 let jsonResult = JSON.stringify(matchesWon, null, 2);
 
 
  fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/2-matches-won-per-team-per-year.json',jsonResult,'utf8')


