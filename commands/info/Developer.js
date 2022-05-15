const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "developer",
  aliases: [],
  description: "Lists The Developer Commands!",
  usage: "developer",
  run: async(client, message, args) => {
    
        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
                return message.channel.send(":x: Invalid Permissions - Needed Permission(s)/n`Bot Developer`")
        }

    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Developer Commands!`)
    .setDescription(`Use ${Prefix}help <Command Name> For More Command Information!` + 
    "\n\n**⚒️ Developer [9]**\n**Forceoff**,\n**Restart**,\n**Music_on**,\n**Music_off**,\n**mmode_on**,\n**mmode_off**,\n**errorscan**,\n**consoleusers**,\n**simjoin**")
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
