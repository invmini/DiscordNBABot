const nba = require("nba.js").default;
  exports.run =(config,msg,params = [] ) =>{
    let d = params[2];
    if(d<10){
      d=d-1;
    }
    var contents = require('../players.json');
    var jsonContent = JSON.parse(JSON.stringify(contents));
    var plId;
    for(var player in jsonContent.league.standard){
      var playerName = jsonContent.league.standard[player].firstName.substring(0, 1)+".";
      if(jsonContent.league.standard[player].firstName === params[1]){
        console.log(playerName);
        if(jsonContent.league.standard[player].lastName === params[0]){
          plId=jsonContent.league.standard[player].personId;
          break;
        }
      }
    }
    console.log("year : "+d+" id : "+plId);
    nba.data.playerGamelog({
      year: d,
      personId: plId,
    }).then(function(res) {
      var parsed=JSON.parse(JSON.stringify(res));
      var strPrint=params[1]+" "+params[0]+" : "+"\n";
      for(var attributename in parsed.league.standard){
        strPrint=strPrint.concat("game ID : ",parsed.league.standard[attributename].gameId,"\n ");
        strPrint=strPrint.concat(parsed.league.standard[attributename].stats.points," pts, ","\t ");
        strPrint=strPrint.concat(parsed.league.standard[attributename].stats.totReb," reb, ","\t ");
        strPrint=strPrint.concat(parsed.league.standard[attributename].stats.assists," ast, ","\n ");
      }
      msg.channel.sendMessage(`\n \`${strPrint}\``);
    }).catch(function(err) {
      console.log(err);
      msg.channel.sendMessage(`\n \`Player not found(${params[0]} ${params[1]})\``);
    });
}
exports.help = {
  name : "playerLastGames",
  description: "get stats of a player's last games",
  usage: "!playerLastGames LastName FirstName year(actual season if blank)"
};
