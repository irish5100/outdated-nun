const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "moderation",
  aliases: [],
  description: "Lists The Moderation Commands!",
  usage: "moderation",
  run: async(client, message, args) => {
    
        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
                return message.channel.send(":x: Invalid Permissions - Needed Permission(s)/n`Staff Member`")
        }
    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Moderation Commands!`)
    .setDescription(`Use ${Prefix}help <Command Name> For More Command Information!` + 
    "\n\n" + "**🔨 Moderation [12]**\n**Clear <Amount>** ~ Clear a number of chat messages,\n**Mute <User> <Reason>** ~ Resirict a members ability to type in chat,\n**Unmute <User>** ~ Restore a members ability to type in chat,\n**Tempmute <User> <Time> <Reason>** ~ Mute a member for a certain amount of time,\n**Kick <User> <Reason>** ~ Kick a member from the guild,\n**Ban <User> <Reason>** ~ Ban a member from the guild,\n**Unban <User>** ~ Unban a member from the guild,\n**Tempban <User> <Time> <Reason>** ~ Ban a member from the guild for a certain amount of time,\n**Warn <User> <Reason>** ~ Warn a member,\n**Warnings <User>** ~ View a members warnings,\n**ResetWarns <User>** ~ Reset a members warns,\n**Antispam** ~ Toggle anti-spam module,/n**Nuke** ~ Delete all the messages from a channel")
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
