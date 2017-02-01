# DiscordNBABot
==================
Discord bot displaying stats from the NBA

-----------

# Available commands

**gameScoreboard**

 >*Parameters : gameId*
 
 >Display game's scoreboard.
 
**yesterdayMatches**

 >*No Parameters*
 
 >Display results from yesterday's matches (EST time) with gameId.
 
**playerStats**

 >*Parameters : LastName, FirstName, year(2016 for 2016/2017 season)
 
 >Display basic stats (points, rebounds, assists, blocks, steals) of a player.
 
 **playerLastGames**

 >*Parameters : LastName, FirstName, year(needed for the moment)
 
 >Display basic stats (points, rebounds, assists) of a player from the last games.

----------

INSTALLATION
-------------

This bot is based on [Discord.js](https://discord.js.org/)! In order to run it, you'll need to install the library from NPM.

> **Note:**

> - You will need to install **[nba.js](https://github.com/kshvmdn/nba.js/)**(git repo).

#### <i class="icon-file"></i> Set-up

You will need to fill in *settings.json* with the token of your bot and the prefix you want to use for your commands. After that, just run index.js and you're good to go!
