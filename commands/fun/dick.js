const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "dick",
  aliases: [],
  description: "Shows a image of deak!",
  usage: "dick",
  run: async (client, message, args) => {
    //Start
    let options = [
      "https://i.redd.it/7azw7uq4vex51.jpg"
    ];

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = options[Math.floor(Math.random() * options.length)];

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Dick Generator`)
      .setDescription(`${Member.user.username} Here is some dick you horny fuck`)
      .setImage(`https://media.discordapp.net/attachments/830027111075020820/913822270647074836/Trollface_non-free.png`)
//https://i.redd.it/7azw7uq4vex51.jpg
      .setFooter(`Requested by ${message.author.username} get trolled horny person :)`)
      .setTimestamp();
  
    message.channel.send(embed);

    //End
  }
};