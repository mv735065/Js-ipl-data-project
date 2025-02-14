//Number of matches played per year for all the years in IPL.

const { log } = require('console');
const matchData = require('../Data/matches.json');

const fs = require('fs');

let result =matchData.reduce((acc,match) => {
   let year = match.season;
   if (!acc.hasOwnProperty(year)) {
      acc[year] = 0;
   }
     acc[year]+=1;

     return acc;
},{});

let jsonResult = JSON.stringify(result, null, 2);


fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/1-matchesPerYear.json', jsonResult, 'utf8')





