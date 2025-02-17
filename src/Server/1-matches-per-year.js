//Number of matches played per year for all the years in IPL.

const matchData = require('../Data/matches.json');

const fs = require('fs');

let matchesPlayedPerYear = getMatchesPlayedPerYear(matchData);

function getMatchesPlayedPerYear(matchData) {

   return matchData.reduce((acc, match) => {
      let year = match.season;
      if (!acc.hasOwnProperty(year)) {
         acc[year] = 0;
      }
      acc[year] += 1;

      return acc;
   }, {});

}

let jsonResult = JSON.stringify(matchesPlayedPerYear, null, 2);


fs.writeFileSync('../Public/output/1-matchesPerYear.json', jsonResult, 'utf8')





