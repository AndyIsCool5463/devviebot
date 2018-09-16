module.exports.run = async (Bot, message, args) => {
    if(args[0] === "foo") {
      message.channel.send('bar');
    }
    console.log(Bot.permissions)
}
module.exports.help = {
  name: "test",
  perm: "ADMINISTRATOR"
}
