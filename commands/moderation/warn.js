const db = require('../../models/warn')
const { Message, MessageEmbed } = require('discord.js')
const { Color } = require("../../config.js");


module.exports = {
    name :'warn',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':x: Invaild Permissions | Needed Permission(s): \n> ADMINISTRATOR')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send(':x: User not found')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send(new MessageEmbed()
            .setDescription(`You Have Been Warned`)
            .addField(`Guild Name`, `${message.guild.name} (${message.guild.id})`)
            .addField(`Reason`, `${reason || "No Reason Provided!"}`)
            .setFooter(`To report abuse please create a ticket in https://discord.gg/QEbKfjc4jw`)
            .setColor("RED")
            .setTimestamp()
        )
    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Member Warned!`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
      .addField(`Warned Member`, `${user.user.tag} (${user.user.id})`)
      .addField(`Reason`, `${reason || "No Reason Provided!"}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();
      
         message.channel.send(embed);

        
    }
}