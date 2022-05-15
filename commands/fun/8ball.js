const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "8ball",
  aliases: ["8ball",],
  description: "Ill tell you if i think something is a good idea or not!",
  usage: "8ball <question>",
  run: async (client, message, args) => {
    //Start
    let options = [
      "Yes","No","Definetly","Absoloutely","Not in a million years","As I see it, yes", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "It is certain", "Most likely", "Outlook not so good",  "try again",  "Very doubtful", "Without a doubt"
    ];

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = options[Math.floor(Math.random() * options.length)];

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`8ball answer machine `)
      .setDescription(`${Member.user.username} i think\n${Result}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};