const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "irish",
  aliases: [],
  description: "Gives details about leader Irish!",
  usage: "irish",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Who is Irish?**`)
      .setDescription(`Irish (Known as Kingluke77) is a small twitch streamer hoping to brighten up peoples days.`)
      .setThumbnail(`https://cdn.discordapp.com/avatars/829438800295624716/e1688fa8ca3a253dfd55a596e711e9f4.png`({ dynamic: true }))
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
