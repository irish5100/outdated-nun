const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");
const db = require('../../models/warn')

module.exports = {
    name : 'removewarn',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':x: Invaild Permissions | Needed Permission(s): \n> ADMINISTRATOR')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(':x: User not found')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Warning Deleted!`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
      .addField(`Member`, `${user.user.tag} (${user.user.id})`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
              
                       message.channel.send(embed);

                data.save()
            } else {
                message.channel.send(':x: USer has no warnings')
            }
        })
    }
}