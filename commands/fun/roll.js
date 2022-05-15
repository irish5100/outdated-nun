const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "Roll a Dice",
  aliases: ["roll"],
  description: "Roll A Dice!",
  usage: "roll",
  run: async (client, message, args) => {
    //Start
    
    const number = ["1", "2", "3", "4", "5", "6"];

    let result = Math.floor(Math.random() * number.length);

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Dice Landed On`)
      .setDescription(number[result])
      .setFooter(`Rolled by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};