// Find the strike rate of a batsman for each season

const matchData = require('../Data/matches.json');
const deliverData = require('../Data/deliver.json');


const fs=require('fs')


let map_ids_to_season=new Map();

matchData.forEach((match)=>{
    let season=match.season;
    let id=match.id;
    
    map_ids_to_season.set(id,season);

 });


let map_season_batters=new Map();

deliverData.forEach((delivery)=>{
    let match_id=delivery.match_id;
    let season=map_ids_to_season.get(match_id);
    if(!map_season_batters.has(season)){
       map_season_batters.set(season,{});
    }
   
   add_batter_results(delivery.batsman,parseInt(delivery.batsman_runs),map_season_batters.get(season));


});



let store_batsman_strikeRate={};

add_strike_rate();

function add_strike_rate(){
map_season_batters.forEach((value,key)=>{
        let season=key;
        
        let obj={};

        for(let batsman_key in value){
            let player=value[batsman_key];
            player["strike_rate"]=(player.runs/player.balls)*100;
          obj[batsman_key]=player["strike_rate"];
        }
        store_batsman_strikeRate[season]=obj;

});
}



console.log(store_batsman_strikeRate)

let jsonResult=JSON.stringify(store_batsman_strikeRate,null,2);

fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/7-strike-rate-batsman-each-season.json',jsonResult,'utf8')

// console.log(map_season_batters)



 function  add_batter_results(batsman,runs,players){
    if(players.hasOwnProperty(batsman)){
       players[batsman].runs+=runs;
       players[batsman].balls+=1;
    }
    else{
        players[batsman]={
            "runs":runs,
            "balls":1,
        }
    }
 }












// {
//     "match_id": "17",
//     "inning": "2",
//     "batting_team": "Royal Challengers Bangalore",
//     "bowling_team": "Rising Pune Supergiant",
//     "over": "10",
//     "ball": "6",
//     "batsman": "AB de Villiers",
//     "non_striker": "KM Jadhav",
//     "bowler": "DT Christian",
//     "is_super_over": "0",
//     "wide_runs": "0",
//     "bye_runs": "0",
//     "legbye_runs": "0",
//     "noball_runs": "0",
//     "penalty_runs": "0",
//     "batsman_runs": "1",
//     "extra_runs": "0",
//     "total_runs": "1",
//     "player_dismissed": null,
//     "dismissal_kind": null,
//     "fielder": ""
//   },




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



