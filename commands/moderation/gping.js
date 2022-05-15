  
const Discord = require("discord.js")
const botconfig = require("../../config.js");

module.exports = {
  name: "ghostping",
  aliases: ["gping"],
  description: "Ghost Pings Everyone! - Only Works For Special People!",
  usage: "ghostping",
  run: async (client, message, args) => {
  
        message.delete()

        if (message.author.id !== '740220055429709865') {
        if (message.author.id !== '829438800295624716')
            return message.channel.send(`Account Unverified - You Can Not Use This!`)
        }
        await message.channel.send(`@everyone`).then(m => m.delete({timeout: 10}));

    }
}