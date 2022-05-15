const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "fuck",
  aliases: [],
  description: "Shows a gif of f00king!",
  usage: "fuck",
  run: async (client, message, args) => {
    //Start
    let options = [
      "https://i.imgur.com/4dlxQ2Z.gif"
    ];

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = options[Math.floor(Math.random() * options.length)];

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Fuck Generator`)
      .setDescription(`${Member.user.username} Here is a f00k gif you horny dick`)
      .setImage(`https://media.discordapp.net/attachments/830027111075020820/913822270647074836/Trollface_non-free.png`)
      .setFooter(`Requested by ${message.author.username} you just got trolled horny person. :)`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};