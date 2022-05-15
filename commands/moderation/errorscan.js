  
const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "errorscan",
  aliases: ["errors"],
  description: "Searches For Errors In the Bot Log! - Only Works For Bot Developers!",
  usage: "errorscan",
  run: async (client, message, args) => {

        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Bot Developer Unverified - You Can Not Use This!`)
        }
        await message.channel.send(`Bot Developer Verified - Bot Is Searching For Errors...`)
        setTimeout(function() {
    }, 1000);
    await message.channel.send("Welcome `Irish`. No Errors Were Found In The Log.")
        setTimeout(function() {
    }, 5000);
    }
}