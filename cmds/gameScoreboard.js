const nba = require("nba.js").default;
var beautify = require('js-beautify').js_beautify;
const fs = require('fs');
var playersMap = new Map();
  exports.run =(config,msg,params = [] ) =>{
    if(params.length <1){
      msg.channel.sendMessage("GameID and date (yyyyMMdd) required");
      return;
    }
    nba.data.boxscore({
      date: params[0],
      gameId : params[1],
    }).then(function(res) {
      var contents = require('../players.json');
      var jsonContent = JSON.parse(JSON.stringify(contents));
      for(var player in jsonContent.league.standard){
        var playerName = jsonContent.league.standard[player].firstName.substring(0, 1)+".";
        playerName=playerName+(jsonContent.league.standard[player].lastName);
        console.log(jsonContent.league.standard[player].lastName);
        playersMap.set(jsonContent.league.standard[player].personId,playerName);
      }
      var parsed=JSON.parse(JSON.stringify(res));
      var strPrint=parsed.basicGameData.vTeam.triCode+'\n';
      var teamId = parsed.basicGameData.vTeam.teamId;
      strPrint=strPrint.concat("player\t points",'\t',"rebonds\t assists\t blocks\t steals",'\n');
      for(var attributename in parsed.stats.activePlayers){
        if(parsed.stats.activePlayers[attributename].teamId!=teamId){
          teamId=parsed.stats.activePlayers[attributename].teamId;
          strPrint=strPrint.concat(parsed.basicGameData.hTeam.triCode,'\n');
        }
        strPrint=strPrint.concat(playersMap.get(parsed.stats.activePlayers[attributename].personId),"\t ");
        strPrint=strPrint.concat(parsed.stats.activePlayers[attributename].points,"\t ");
        strPrint=strPrint.concat(parsed.stats.activePlayers[attributename].totReb,"\t ");
        strPrint=strPrint.concat(parsed.stats.activePlayers[attributename].assists,"\t ");
        strPrint=strPrint.concat(parsed.stats.activePlayers[attributename].blocks,"\t ");
        strPrint=strPrint.concat(parsed.stats.activePlayers[attributename].steals,'\n');
      }
      msg.channel.sendMessage(`\n \`${strPrint} \``);
    }).catch(function(err) {
      console.error(err);
    });
}
exports.help = {
  name : "gameBoxscore",
  description: "get the boxscore of a NBA match",
  usage: "!gameBoxscore date(yyyyMMdd) gameId"
};
