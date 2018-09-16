const Discord = require('Discord.js'); // requires Discord
const Bot = new Discord.Client();
const botSettings = require('./botSettings.json'); // requires Bot settings
const fs = require('fs');
const mysql = require('mysql');
const prefix = botSettings.prefix;

Bot.commands = new Discord.Collection();
Bot.mutes = require('./mutes.json');

fs.readDir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles.length <= 0) {
    console.log("No Commands to load (Incorrect Setup?)");
    return;
  }
  console.log(`Loading ${jsFiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded`);
    Bot.commands.set(props.help.name, props);
  });
});
