const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");
const db = require('../../models/warn')

module.exports = {
    name : 'resetwarns',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':x: Invaild Permissions | Needed Permission(s): \n> ADMINISTRATOR')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(':x: User not found')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Warnings Reset!`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
      .addField(`Cleared Member`, `${user.user.tag} (${user.user.id})`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
              
                       message.channel.send(embed);

            } else {
                message.channel.send(':x: User has no warnings')
            }
        })
    }
}