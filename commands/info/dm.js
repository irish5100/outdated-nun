const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "dm",
  aliases: [],
  description: "Dm A Member As The Bot!",
  usage: "dm <Target Member>",
  run: async(client, message, args) => {

    let dUser =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!dUser) return message.channel.send(`:x: Invalid Member`);
    
 if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.reply(":x: Invalid Permissions | Needed Permission(s): \n\n> ADMINISTRATOR");
    
// let dMessage = args.join(' ').slice(22);
              let dMessage = args.slice(0).join(" ")
 if (dMessage.length < 1) return message.reply(':x: Please Specifiy A Message To Send');

        const dm = new MessageEmbed()
            .setDescription(`:incoming_envelope: | You Have Received A Message`)
            .addField(`Guild Name`, `${message.guild.name} (${message.guild.id})`)
            .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
            .addField(`Message Content`, `${dMessage}`)
            .setColor("BLURPLE")
            .setFooter(`To report abuse please create a ticket in https://discord.gg/QEbKfjc4jw`)
            .setTimestamp()

      dUser.send(dm)
    
 // dUser.send(`${dUser} A moderator from TESTING sent you: ${dMessage}`);

        const successMessage = new MessageEmbed()
            .setDescription(`:white_check_mark: | Message Sent To Target Successfully`)
            .addField(`Guild Name`, `${message.guild.name} (${message.guild.id})`)
            .addField(`Bot Name`, `${client.user} (${client.user.id})`)
            .addField(`Target User`, `${dUser} (${dUser.user.id})`)
            .addField(`Message Content`, `${dMessage}`)
            .setColor("BLURPLE")
            .setTimestamp()

      message.author.send(successMessage)    

    message.channel.send(`:white_check_mark: Success | Sent Message! -- Check Your DMs For More Information!`)
    
// message.author.send(  `${message.author} :white_check_mark: Success | Message Sent To ${dUser}!`);
  }}