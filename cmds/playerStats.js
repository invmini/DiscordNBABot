const nba = require("nba.js").default;
  exports.run =(config,msg,params = [] ) =>{
    let d = params[2];
    if(d<10){
      d=d-1;
    }
    console.log("ALLO ?");
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
    nba.data.playerProfile({
      year: d,
      personId: plId,
    }).then(function(res) {
      var parsed=JSON.parse(JSON.stringify(res));
      var stats = parsed.league.standard.stats.latest;
      var strPrint=params[1]+" "+params[0]+" : ";
      strPrint=strPrint.concat(parsed.league.standard.stats.latest.ppg," pts, ");
      strPrint=strPrint.concat(parsed.league.standard.stats.latest.rpg," rbs, ");
      strPrint=strPrint.concat(parsed.league.standard.stats.latest.apg," ast, ");
      strPrint=strPrint.concat(parsed.league.standard.stats.latest.bpg," blk, ");
      strPrint=strPrint.concat(parsed.league.standard.stats.latest.spg," stl");
      msg.channel.sendMessage(`\n \`${strPrint} \``);
    }).catch(function(err) {
      msg.channel.sendMessage(`\n \`Player not found(${params[0]} ${params[1]})\``);
    });
}
exports.help = {
  name : "playerStats",
  description: "get stats of a player",
  usage: "!playerStats LastName FirstName year(all time if not specified)"
};
