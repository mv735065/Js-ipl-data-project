// Find the number of times each team won the toss and also won the match

const matchData = require("../Data/matches.json");

const fs = require("fs");

let teamsWonBoth = {};

matchData.forEach((match) => {
  let toss_winner = match.toss_winner;
  let match_winner = match.winner;

  if (toss_winner !== match_winner) return;

  if (!teamsWonBoth.hasOwnProperty(match_winner)) {
    teamsWonBoth[match_winner] = 0;
  }
  teamsWonBoth[match_winner] += 1;
});

 let jsonResult=JSON.stringify(teamsWonBoth,null,2);

 fs.writeFileSync('/home/vamshi/Documents/JS-IPL-DATA/src/Public/output/5-won-toss-and-match.json',jsonResult,'utf8')
