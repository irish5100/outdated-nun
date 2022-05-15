const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "vaginasize",
  aliases: ["pussysize", "psize"],
  description: "Shows Members Vaginia Size!",
  usage: "vaginiasize <Mention Member>",
  run: async (client, message, args) => {
    //Start
    
    let sizes = [
      "",
      "Very Small",
      "Tiny",
      "Small",
      "Medium-ish",
      "Below Average",
      "Average",
      "Above Average",
      "Big",
      "Large",
      "Huge",
      "Massive",
      "Gigantic",
      "Enormous",
      "Humongous",
    ];

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = sizes[Math.floor(Math.random() * sizes.length)];

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Women's PP Size Machine`)
      .setDescription(`${Member.user.username} Size Is\n${Result}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};