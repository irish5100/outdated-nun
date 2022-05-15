const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "upcoming",
  aliases: ["updates"],
  description: "Shows Upcoming Bot Updates!",
  usage: "upcoming",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setTitle(`Upcoming Updates!`)
      .setColor(Color)
      .setDescription("`Level, Leaderboard, Report, Suggest, Twitch`")
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
