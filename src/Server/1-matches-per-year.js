//Number of matches played per year for all the years in IPL.



const matchData = require('../Data/matches.json');

const fs = require('fs');



 let map=new Map();

 matchData.forEach((match)=>{
    let year=match.season;
    if(map.has(year)){
       map.set(year,map.get(year)+1);
    }else{
        map.set(year,1);
    }

 });


 let totalMatches=[...map.values()].reduce((sum,element)=>{
    return sum+=element;
 },0)

 console.log(totalMatches)

 console.log(map);



 let result = Object.fromEntries(map);

// Convert Object to JSON string
let jsonResult = JSON.stringify(result, null, 2);

// Write to data.json file

 fs.writeFileSync('../public/output/matchesPerYear.json',jsonResult,'utf8')



