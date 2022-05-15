const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "images",
  aliases: [],
  description: "Lists The Image Commands!",
  usage: "images",
  run: async(client, message, args) => {
    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Image Commands!`)
    .setDescription(`Use ${Prefix}help <Command Name> For More Command Information!` + 
    "\n\n**⭐ Images [11]**\n**cat**,\n**dog**,\n**bird**,\n**panda**,\n**fox**,\n**koala**,\n**Deepfry**,\n**Tweet**,\n**Drake <Phrase> / <Phrase>**,\n**ChangeMyMind <Phrase>**,\n**OhNo <Phrase>**")
    // cat,/ndog,/nbird,/npanda,/nfox,/nkoala,/nDeepfry,/nTweet,/nDrake <Phrase> <Phrase>,/nChangeMyMind <Phrase>,/nOhNo <Phrase>
    .setFooter(`Requested By ${message.author.username}`)
    .setFooter("Made By Zero Development | Https//www.zerodevelopment.ml | discord.gg/QEbKfjc4jw");
    
    if (!args.length) return message.channel.send(embed);

    let cmd =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.get(client.aliases.get(args[0].toLowerCase()));

    let embed2 = new MessageEmbed()
      .setColor(Color)
      .setTitle(`${cmd.name} Information!`)
      .addField(`Aliases`, cmd.aliases || "None!")
      .addField(`Usage`, cmd.usage || "No Usage!")
      .addField(`Description`, cmd.description || "No Description!")
    .setFooter("Made By Zero Development | Https//www.zerodevelopment.ml | discord.gg/QEbKfjc4jw")
      .setTimestamp();

    if (cmd) {
      return message.channel.send(embed2);
    } else {
      return message.channel.send(embed);
    }
  }
};
