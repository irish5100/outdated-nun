const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "credits",
  aliases: [],
  description: "Shows The Bots Credits.",
  usage: "credits",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Credits**`)
      .setDescription(`
      **Zero Development** ~ Main Company.
      **Irish#8057** ~ Bot Programmer/Maintainer.
      **Zero** ~ Secondary Programmer
      **Phantom161#3111** ~ Bug Tester 
      `)
     .setFooter(`[Zero Development](discord.gg/QEbKfjc4jw)  | Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
