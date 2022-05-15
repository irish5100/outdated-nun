const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js");

const botconfig = require("../../config.js");

module.exports = {
  name: "removerole",
  aliases: ["takerole"],
  description: "Remove A Members Role!",
  usage: "removerole <Target> <Target Role>",
  run: async (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(":x: Invalid Permissions. \n\n> `ADMINISTRATOR`\n\n");
        
        const targetUser = message.mentions.users.first()
    if (!targetUser) {
      
              let mentionMember = new MessageEmbed()
      .setColor(`RED`)
      .setTitle(`:x: | Missing Argument`)
      .setDescription(`Please Mention A Valid Member.`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    message.channel.send(mentionMember) 
      
      return
    }

    args.shift()

    const roleName = args.join(' ')
    const { guild } = message

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName
    })
    if (!role) {
      
              let invalidRole = new MessageEmbed()
      .setColor(`RED`)
      .setTitle(`:x: | Error`)
      .setDescription(`Please Mention A Valid Role To Remove From ${targetUser}.`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    message.channel.send(invalidRole) 
      
            return
    }

    const member = guild.members.cache.get(targetUser.id)
    if (member.roles.cache.get(role.id)) {
      member.roles.remove(role)
      
              let Success = new MessageEmbed()
      .setColor(`GREEN`)
      .setTitle(`:white_check_mark: | Success`)
      .addField(`Guild Name`, `${message.guild.name} (${message.guild.id})`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
      .addField(`Target Member`, `${targetUser} (${targetUser.id})`)
      .addField(`Role Removed`, `${roleName}`)
     .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    message.channel.send(Success)
    } else {
              let invalidRole = new MessageEmbed()
      .setColor(`RED`)
      .setTitle(`:x: | Error`)
      .setDescription(`That User Doesn't Have The ${roleName} Role.`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
    message.channel.send(invalidRole) 
          }
    }
}