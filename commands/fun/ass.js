const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "ass",
  aliases: [,],
  description: "Shows a image of booty!",
  usage: "ass",
  run: async (client, message, args) => {
    //Start
    let options = [
      "https://cdn.nekobot.xyz/b/2/4/89e93fa4324c99fc29f6439e9a885.jpg"
    ];

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = options[Math.floor(Math.random() * options.length)];

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Booty Generator`)
      .setDescription(`${Member.user.username} Here is some BOOTY you horny person`)
      .setImage(`https://media.discordapp.net/attachments/830027111075020820/913822270647074836/Trollface_non-free.png`)
      .setFooter(`Requested by ${message.author.username} you little horny person`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};