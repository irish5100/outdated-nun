const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "nameset",
  aliases: [],
  description: "Change A Channel Name!",
  usage: "nameset <text>",
  run: async (client, message, args) => {
    
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        ":x: Invalid Permissions | Needed Permission(s): \n\n> MANAGE_CHANNELS"
      );
    
        if (!args[0])
      return message.channel.send(
        `:x: | Please Mention A New Name For The Channel!`
      );

    
  let channel = message.channel;
    let newName = args.slice(0).join(" ");


    
  channel.setName(`${newName}`);

        let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`:white_check_mark: | Channel Name Updated`)
      .addField(`Channel`, `${message.channel.name} (${message.channel.id})`)
      .addField(`Old Name`, `${message.channel.name}`)
      .addField(`New Name`, `${newName}`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

   message.channel.send(embed);
    
}
    
  }