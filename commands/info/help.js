const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Help Command!",
  usage: "Help | <Command Name>",
  run: async(client, message, args) => {
    
    
    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Commands!`)
    .setDescription(`Use ${Prefix}Help <Command Name> For More Command Information!` + 
    `\n\n**🤣 Fun [15]**\n${Prefix}fun` + "\n\n" + `**💰 Economy [17]**\n${Prefix}economy` + "\n\n"+
    `**🎵 Music [16]**\n${Prefix}music` + "\n\n" + `**⚒️ Developer [9]**\n${Prefix}developer` + "\n\n" + `**🔨 Moderation [12]**\n${Prefix}moderation` + "\n\n" + `**⭐ Images [11]**\n${Prefix}images` + "\n\n" + `**🔍 Information [12]**\n${Prefix}information`  + "\n\n" + `**📂 Upcoming Commands [5]**\n${Prefix}upcoming`)
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
