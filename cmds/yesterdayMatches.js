const nba = require("nba.js").default;
  exports.run =(config,msg,params = [] ) =>{
    let d;
    //EST
    offset = -5.0

    clientDate = new Date();
    utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);

    d = new Date(utc + (3600000*offset));

    let strDate;
    strDate=""+d.getFullYear();
    d.setDate(d.getDate()-1);
    if(d.getMonth()<9){
      strDate=strDate.concat("0",d.getMonth()+1,d.getDate());
    }else{
      strDate=strDate.concat(d.getMonth()+1,d.getDate());
    }
    console.log(strDate);
    nba.data.scoreboard({
      date: strDate,
    }).then(function(res) {
      var parsed=JSON.parse(JSON.stringify(res));
      var strPrint="";
      for(var attributename in parsed.games){
        strPrint=strPrint.concat(parsed.games[attributename].gameId," / ");
        strPrint=strPrint.concat(parsed.games[attributename].vTeam.triCode," ");
        strPrint=strPrint.concat(parsed.games[attributename].vTeam.score,"-",parsed.games[attributename].hTeam.score," ");
        strPrint=strPrint.concat(parsed.games[attributename].hTeam.triCode," ",'\n');
      }
      msg.channel.sendMessage(`\n \`${strPrint} \``);
    }).catch(function(err) {
      console.error(err);
    });
}
exports.help = {
  name : "yesterdayMatches",
  description: "get all NBA matches from yesterday (EST time)",
  usage: "yesterdayMatches"
};
