const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "music on",
  aliases: ["music_on"],
  description: "Turns Music Commands On - Only Works For Bot Developers!",
  usage: "music_on",
  run: async (client, message, args) => {

        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Bot Developer Unverified - You Can Not Use This!`)
        }
        await message.channel.send(`Bot Developer Verified - Music commands are turning on...`)
        process.exit();
    }
}