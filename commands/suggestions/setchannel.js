const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "setchannel",
    category: "Suggestions",
    description: "Set A Channel For Suggestions",
    aliases: ["sc"],
    usage: "setchannel <intent> <channel>",
    run: async(client, message, args) => {
          if (!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(`:x: Invalid Permissions | Needed Permission(s) \n\n> Staff Member`)
        }
        if(args[0] === "suggestions") {
            let channel = message.mentions.channels.first()
            if(!channel) {
                const noChannel = new MessageEmbed()
                .setDescription(`:x: | Channel Missing`)
                .setColor(client.colors.red)
                .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(channel)

            }

            db.set(`suggestionChannel_${message.guild.id}`, message.channel.id)

            const success = new MessageEmbed()
            .setDescription(`:white_check_mark: | Set The Suggestion Channel To ${channel}`)
            .setColor(client.colors.green)
            .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(success)

        } else {
            const noArgs = new MessageEmbed()
            .setDescription(`:x: | Channel Intent Missing - E.g \n> suggestions`)
            .setColor(client.colors.red)
            .setFooter(`© Zero Development`, client.user.displayAvatarURL())

message.channel.send(noArgs)

        }
    }
}