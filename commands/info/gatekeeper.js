const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "welcome",
  aliases: [],
  description: "Controls the events that happens when someone joins your server..",
  usage: "welcome <Channel ID> <Message>",
  run: async (client, message, args, member) => {
  //Start

        let Channel = member.guild.channels()
    
    
    if (!Channel)
      return message.channel.send(
        `Please Mention A Channel!`
      )
    
    
        let gatekeeperChannel = args.slice(1).join(" ")
            let gatekeeperMessage = args.slice(2).join(" ")

    const success = new MessageEmbed()
      .setColor(Color)
      .setTitle(`:white_check_mark: | Success`)
      .addField(`Welcome Channel`, `${gatekeeperChannel}`)
      .addField(`Welcome Message`, `${gatekeeperMessage}`)
      .setDescription(`Read Rules!`)
      .setFooter(``)
      .setTimestamp()

    message.channel.send(success);

      client.on("guildMemberAdd", member => {
    const gateKeeper = new MessageEmbed()
      .setColor(Color)
      .setTitle(`**Member Joined**`)
      .addField(`Joined Member`, `${member}`)
      .setDescription(`${gatekeeperMessage}`)
      .setFooter(`© Zero Development 2020`)
      .setTimestamp()

    gatekeeperChannel.send(gateKeeper);

    //End
  }
)}};
