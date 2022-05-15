const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "Phantom",
  aliases: [],
  description: "Gives details about Phantom!",
  usage: "Phantom",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Who is Phantom?**`)
      .setDescription(`Phantom is a friend of Luke and is occasionally in his streams.`)
      .setThumbnail(`https://cdn.discordapp.com/avatars/946819218257621002/e21d0e5ee70302f2395582959da708af.png?size=4096`({ dynamic: true }))
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
