// Find a player who has won the highest number of Player of the Match awards for each season

// {
//     "id": "1",
//     "season": "2017",
//     "city": "Hyderabad",
//     "date": "2017-04-05",
//     "team1": "Sunrisers Hyderabad",
//     "team2": "Royal Challengers Bangalore",
//     "toss_winner": "Royal Challengers Bangalore",
//     "toss_decision": "field",
//     "result": "normal",
//     "dl_applied": "0",
//     "winner": "Sunrisers Hyderabad",
//     "win_by_runs": "35",
//     "win_by_wickets": "0",
//     "player_of_match": "Yuvraj Singh",
//     "venue": "\"Rajiv Gandhi International Stadium",
//     "umpire1": "Uppal\"",
//     "umpire2": "AY Dandekar",
//     "umpire3": "NJ Llong"
//   },


const matchData = require('../Data/matches.json');

const fs=require('fs')

let map=new Map();


matchData.forEach((match)=>{
    let year=match.season;
    if(!map.has(year)){
       map.set(year,{});
    }
  
    let player_of_match=match.player_of_match;

    let players=map.get(year);

    add_player_result_in_year(player_of_match,players);


 });

 let result=[];

 map.forEach((players,year)=>{
    let player=get_highest_score_player(players);
    result.push({[year]:player});
});


 function add_player_result_in_year(player_of_match,players){

    if(players.hasOwnProperty(player_of_match)){
        players[player_of_match]+=1;
    }
    else{
        players[player_of_match]=1;
    }
 }



 function get_highest_score_player(players){


    let store=[];
  let score=0;
  let winner=null;

  for(let playerKey in players){
    if(players[playerKey]>score){
        store=[];
        score=players[playerKey];
        winner=playerKey;
        store.push({
            "name":winner,
            "playerMatchCount":score,
         });
         continue;
    }
    if(players[playerKey]==score){
        score=players[playerKey];
        winner=playerKey;
        store.push({
            "name":winner,
            "playerMatchCount":score,
         });
    }

    
  }
  return store;

 }



 console.log(result);

 let jsonResult=JSON.stringify(result,null,2);


 fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/6-highest-number-of-Player-of-the-Match.json',jsonResult,'utf8')
