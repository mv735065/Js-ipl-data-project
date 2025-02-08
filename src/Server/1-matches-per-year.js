//Number of matches played per year for all the years in IPL.



const matchData = require('../Data/matches.json');

const fs = require('fs');



let store_Clousers_eachSeason = {};

function outer(year) {
   let count = 1;
   return function () {
      return count++;
   }
}
let kk = {}
matchData.map((match) => {
   let year = match.season;
   if (!store_Clousers_eachSeason.hasOwnProperty(year)) {
      store_Clousers_eachSeason[year] = outer(year);
   }
   let value = store_Clousers_eachSeason[year]();
   kk[year] = value;


});
console.log(kk)



let map = new Map();

matchData.forEach((match) => {
   let year = match.season;
   if (map.has(year)) {
      map.set(year, map.get(year) + 1);
   } else {
      map.set(year, 1);
   }

});


console.log(map);



let result = Object.fromEntries(map);

let jsonResult = JSON.stringify(result, null, 2);


fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/1-matchesPerYear.json', jsonResult, 'utf8')





