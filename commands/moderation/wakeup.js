  
const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "wakethefuckup",
  aliases: ["WAKETHEFUCKUP"],
  description: "Wakes The Bot Up From Its Sleep! - Only Works For Special People!",
  usage: "wakethefuckup",
  run: async (client, message, args) => {

        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Bot Developer Unverified - You Can Not Use This!`)
        }
        await message.channel.send(`Special Person Verified...`)
        await message.channel.send(`IM AWAKE YOU FUCKING DICKHEAD.`)
        process.exit();
    }
}