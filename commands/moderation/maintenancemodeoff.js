const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "maintenance mode",
  aliases: ["mmodeoff"],
  description: "Take The Bot Out Of Maintenance Mode - Only Works For Bot Developers!",
  usage: "mmode_off",
  run: async (client, message, args) => {

        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Bot Developer Unverified - You Can Not Use This!`)
        }
        await message.channel.send(`Bot Developer Verified - Bot is leaving maintenance mode...`)
        process.exit();
    }
}