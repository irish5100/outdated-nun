const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "invite",
  aliases: [],
  description: "Shows How To Invite The Bot To Your Server.",
  usage: "invite",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**How Do I Invite This Bot To My Server?**`)
      .setDescription(`
      As of now, this bot is private. To purchase this bot you must join the Official Zero Development discord server and create a ticket.
      `)
      .setFooter(`https://www.discord.gg/bzaWMX9R6A | Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
