const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "topicset",
  aliases: [],
  description: "Change A Channel Topic!",
  usage: "topicset <text>",
  run: async (client, message, args) => {
    
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        ":x: Invalid Permissions | Needed Permission(s): \n\n> MANAGE_CHANNELS"
      );
    
        if (!args[0])
      return message.channel.send(
        `:x: | Please Mention A New Topic For The Channel!`
      );

    
  let channel = message.channel;
    let newTopic = args.slice(0).join(" ");


    
  channel.setTopic(`${newTopic}`);

        let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`:white_check_mark: | Channel Topic Updated`)
      .addField(`Channel`, `${message.channel.name} (${message.channel.id})`)
      .addField(`Old Topic`, `${message.channel.topic}`)
      .addField(`New Topic`, `${newTopic}`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

   message.channel.send(embed);
    
}
    
  }