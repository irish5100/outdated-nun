/*

const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setAuthor("Commands")
        .setTitle("Economy Commands")
        .setDescription(`Total Economy Commands: ${client.commands.size}`)
        .setColor("BLURPLE")
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL)
        .setFooter(message.author.tag, message.author.displayAvatarURL);
    client.commands.forEach(cmd => {
        embed.addField(`${cmd.help.name}`, `Aliases: ${cmd.help.aliases.join(", ") || "None"}\nUsage: \`${client.prefix}${cmd.help.usage}\``, true);
    });
    return message.channel.send(embed);
}

exports.help = {
    name: "economy",
    aliases: ["ehelp"],
    usage: `economy`
}
*/

const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "economy",
  aliases: [],
  description: "Lists The Economy Commands!",
  usage: "economy",
  run: async(client, message, args) => {
        
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Economy Commands!`)
    .setDescription(`Use ${Prefix}help <Command Name> For More Command Information!` + 
    "\n\n**💰 Economy [17]**\n`balance ~ Shows your current amount of money,\nBeg ~ Try to beg for money,\nbuy <Item> ~ Buy an item from the shop,\ndaily ~ Collect your daily reward,\neconomy ~ Shows this message,\ninventory ~ View your inventory,\nleaderboard ~ Shows the current leaderboard,\nprefix <Phrase> ~ Change the bots prefix,\nrob <User> ~ Attempt to steal from another member,\nsearch ~ Searches a random place for rewards,\nsetmoney ~ Sets a players money balance,\nshop ~ View the shop,\ntransfer <Target> <Amount> ~ Transfer money to another person,\nweekly ~ Collect your weekly reward,\nwork ~ Work for some money`")
    .setFooter(`Requested By ${message.author.username}`)
    .setFooter("Made By Zero Development | Https//www.zerodevelopment.ml | discord.gg/QEbKfjc4jw");
    
        const errorMessage = new MessageEmbed()
            .setDescription(`:x: | Important Notice | :warning:`)
            .addField(`Economy Remake`, `The bots economy system will be offline for a while. Sorry for any inconvenience! Zero Development sincerely apologises.`)
            .setFooter(`ETA - 5 Days`)
            .setColor("BLURPLE")
            .setTimestamp()

      message.author.send(errorMessage)      
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
