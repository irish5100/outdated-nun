const db = require('../../models/warn')
const { Message, MessageEmbed } = require('discord.js')

module.exports = {
    name :'warnings',
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
            if(data) {
                message.channel.send(new MessageEmbed()
                    .setTitle(`${user.user.tag}'s Warnings!`)
                    .setDescription(
                        data.content.map(
                            (w, i) => 
                            `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`
                        )
                    )
                    .setColor("BLUE")
                    .setTimestamp()
                )
            } else {
                message.channel.send(':x: User has no data')
            }

        })
    }
}