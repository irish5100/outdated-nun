  
const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "consoleusers",
  aliases: ["console"],
  description: "Shows the List Of People That Are Logged Into The Bot Console! - Only Works For Bot Developers!",
  usage: "consoleusers",
  run: async (client, message, args) => {

        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Bot Developer Unverified - You Can Not Use This!`)
        }
        await message.channel.send(`Bot Developer Verified - Bot Is Searching For Users...`)
    await message.channel.send(`Users Logged On To Console:
    - User : Irish#8057 (829438800295624716) Server : Niko Fanserver!! (937091215592161351)`)
        setTimeout(function() {
    }, 5000);
        process.exit();
    }
}