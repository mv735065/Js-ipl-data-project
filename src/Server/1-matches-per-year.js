//Number of matches played per year for all the years in IPL.

const { log } = require('console');
const matchData = require('../Data/matches.json');

const fs = require('fs');

let store_Clousers_eachSeason = {};

function clouser(year) {
   let count = 0;
   return function () {
     count+=1;
      return count;
   }
}
let result = {};
matchData.map((match) => {
   let year = match.season;
   if (!store_Clousers_eachSeason.hasOwnProperty(year)) {
      store_Clousers_eachSeason[year] = clouser(year);
   }

   let value = store_Clousers_eachSeason[year]();
   result[year] = value;
});
console.log(result);

let jsonResult = JSON.stringify(result, null, 2);


fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/1-matchesPerYear.json', jsonResult, 'utf8')





