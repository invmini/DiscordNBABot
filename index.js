const Discord = require('discord.js');
const bot = new Discord.Client();
const settings =require('./settings.json');
const prefix = settings.prefix;
const fs = require('fs');

var config={
	prefix : settings.prefix,
	botInstance : false
};

var commands = new Map();

bot.on('ready',() => {
	console.log("\n" + bot.user.username + " is ready! ");
});

fs.readdir(`./cmds/`, (err, files) => { // Load commands from files
  if (err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  files.map(f => {
    let props = require(`./cmds/${f}`);
    console.log(`Loading Command: ${props.help.name}. :ok_hand:`);
    commands.set(props.help.name, props);
  });
});

bot.on('message', msg => {

	if (msg.author === bot.user) return;
  if (!msg.content.startsWith(prefix)) return;

  let command = msg.content.split(' ')[0].slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

  if (command != "") console.log(">" + command);

  if (commands.has(command)) {
    let cmd = commands.get(command);
    cmd.run(config, msg, args);
  }

});
bot.login(settings.token);
