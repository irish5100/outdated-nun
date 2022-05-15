const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "information",
  aliases: [],
  description: "Lists The Information Commands!",
  usage: "information",
  run: async(client, message, args) => {
    
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Information Commands!`)
    .setDescription(`Use ${Prefix}help <Command Name> For More Command Information!` + 
    "\n\n**🔍 Information [12]**\n**Help** ~ Shows commands.\n**Weather <City/Country>** ~ Shows a places weather forcast.\n**Covid** ~ Shows covid-19 status.\n**Poll <Channel> <Phrase>** ~ Create a poll.\n**Userinfo <user>** ~ Shows a users discord information,\n**Serverinfo** ~ Shows the server information,\n**Ping** ~ Shows bot ping information,\n**Embed <Phrase>** ~ Embed A Custom Message,\n**Calculate <Question>** ~ Calculates A Maths Question,\n**Worldclock** ~ Shows The Current Time In Differnet Contries,\n**Credits** ~ Shows bot credits,\n**Upcoming** ~ Shows upcoming commands")
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
