const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "music",
  aliases: [],
  description: "Lists The Music Commands!",
  usage: "music",
  run: async(client, message, args) => {

    let embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`${client.user.username} Music Commands!`)
    .setDescription(`Use ${Prefix}help <Command Name> For More Command Information!` + 
    "\n\n**🎵 Music [16]**\n**Autoplay** ~ Automaticly play songs,\n**Join <ID>** ~ Bot joins a certain channel,\n**Leave** ~ Bot leaves its current channel,\n**Filters <Input>** ~ Filters the music,\n**Pause** ~ Pauses the music player,\n**Play <Song Name>** ~ Play a song,\n**Playskip <Input>** ~ Play and song and skip the current song playing,\n**Previous** ~ Previous Songs,\n**Queue** ~ View the song queue,\n**repeat** ~ Put the music player on repeat,\n**Resume** ~ Resume a paused song,\n**Seek <Input>** ~ Seek to a certain time,\n**Shuffle** ~ Shuffle the current queue,\n**Skip** ~ Skip the current song,\n**Stop** ~ Stops the music player,\n**Volume <Input>** ~ Change the music volume")
    .setFooter(`Requested By ${message.author.username}`)
    .setFooter(`Made By Zero Development.`);
    
            const errorMessage = new MessageEmbed()
            .setDescription(`:x: | Important Notice | :warning:`)
            .addField(`Muisc Remake`, `The bots music system will be offline for a while. Sorry for any inconvenience! Zero Development sincerely apologises.`)
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
      .setFooter(`Made By Zero Development.`)
      .setTimestamp();

    if (cmd) {
      return message.channel.send(embed2);
    } else {
      return message.channel.send(embed);
    }
  }
};
