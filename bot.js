const Discord = require('Discord.js'); // requires Discord
const Bot = new Discord.Client();
const botSettings = require('./botSettings.json'); // requires Bot settings
const fs = require('fs');
const mysql = require('mysql');
const prefix = botSettings.prefix;
Bot.login(botSettings.token)
Bot.commands = new Discord.Collection();
Bot.permissions = new Discord.Collection();

fs.readdir("./commands/", (err, files) => { // Command Handler
  if(err) console.log(err);

  let jsFiles = files.filter(f => f.split(".").pop() === "js");
  if(jsFiles.length <= 0) {
    console.log("No Commands to load (Incorrect Setup?)");
    return;
  }
  console.log(`Loading ${jsFiles.length} commands!`);

  jsFiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded`);
    Bot.commands.set(props.help.name, props);
    Bot.permissions.set(props.help.perm, props);
  });
});
console.log(Bot.permissions)
Bot.on("ready", async() => { // Starts up Bot with settings
  console.log(`Devvie Bot has started, with ${Bot.users.size} users, in ${Bot.channels.size} channels of ${Bot.guilds.size} guilds.`);
  console.log(`Ready to recive commands.`);

  Bot.user.setActivity(`Hosting ${Bot.guilds.size} with ${Bot.users.size} members`); // sets Activity
  Bot.user.setUsername("Devvie"); // sets username
});

Bot.on("message", async message => { // Message handler
  if(message.author.bot) return; // Wont reply to other bots
  if(message.channel.type === 'dm') return; // wont reply if command is in dms
  let messageArray = message.content.split(' '); // message breaker
      let command = messageArray[0]
      let args = messageArray.slice(1);

      let cmd = Bot.commands.get(command.slice(prefix.length));
      if (cmd) cmd.run(Bot, message, args);
  // Start coding from here

});
