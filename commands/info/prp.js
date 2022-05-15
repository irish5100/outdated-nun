const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "prp",
  aliases: ["pacificrp", "pacificroleplay"],
  description: "Gives details about pacific Roleplay!",
  usage: "prp",
  run: async (client, message, args) => {
    //Start
    

    const embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**What is Pacific Roleplay??**`)
      .setDescription(`Pacific Roleplay is a public server that Luke plays on when he streams FiveM. Luke and Phantom are the founders of Pacific Roleplay and you can come play with them whenever!`)
      .addField(`How Do I Join?`, `You can get more information on the Official [Discord Server](https://discord.gg/N34kQvkrPR)`)
      .setThumbnail(`https://cdn.discordapp.com/icons/922511696369713203/9c462386ba7f7ce26f1f9077d321b9d7.png?size=4096`({ dynamic: true }))
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
