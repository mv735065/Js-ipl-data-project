//Number of matches played per year for all the years in IPL.

const { log } = require('console');
const matchData = require('../Data/matches.json');

const fs = require('fs');


let result=getMatchesPlayedPerYear(matchData);



function getMatchesPlayedPerYear(matchData){
   let store={};
   for(let match of matchData){
      let year = match.season;
      if (!store.hasOwnProperty(year)) {
         store[year]=0;
      } 
      store[year]+=1;

   }
   return store;
}



console.log(result);

let jsonResult = JSON.stringify(result, null, 2);


fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/1-matchesPerYear.json', jsonResult, 'utf8')





