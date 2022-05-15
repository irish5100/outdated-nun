const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "maintenance mode",
  aliases: ["mmodeon"],
  description: "Turns The Bot Into Maintenance Mode - Only Works For Bot Developers!",
  usage: "mmode_on",
  run: async (client, message, args) => {

        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Bot Developer Unverified - You Can Not Use This!`)
        }
        await message.channel.send(`Bot Developer Verified - Bot is entering Maintenance Mode...`)
        process.exit();
    }
}