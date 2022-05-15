const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "fun",
  aliases: [],
  description: "Lists The Fun Commands!",
  usage: "fun",
  run: async(client, message, args) => {
        
    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Fun Commands!`)
    .setDescription(`Use ${Prefix}help <Command Name> For More Command Information!` + 
    "\n\n**🤣 Fun [15]**\n**Avatar <user>** ~ Shows a users avatar picture,\n**Coinflip** ~ Heads Or Tails?,\n**Howgay <User>** ~ Shows how gay a person is,\n**Meme** ~ displays a random meme,\n**Rate <Phrase>** ~ Rate something,\n**8ball <Phrase>** ~ What you should do about something,\n**Say <Phrase>** ~ Say something as the bot,\n**Dicksize <User>** ~ Shows a persons dicksize,\n**Ascii <Phrase>** ~ Write in cool letters,\n**Choose <Phrase>** ~ Choose between something,\n**Hack <User>** ~ Hack someone,\n**Randomnumber** ~ Displays a random number,\n**Roll** ~ Rolls a dice,\n**TicTactoe <Target>** ~ Play TicTacToe,\n**Hangman <Channel> <Word>** ~ Play a game of Hangman")
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
