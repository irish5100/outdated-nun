  
const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "simjoin",
  aliases: ["simjoin"],
  description: "Simulates A Join - Only Works For Bot Developers!",
  usage: "simjoin",
async run (bot, message, args) {

    if(message.author.id != "829438800295624716") return message.channel.send("Bot Developer Unverified - You Can Not Use This!")

    try {
        await message.channel.send("Bot Developer Verified - Bot Is Simulating A Join")
                bot.emit('guildMemberAdd', message.member);
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


}
}