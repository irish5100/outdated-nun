const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "suggest",
    category: "Suggestions",
    description: "Suggest something.",
    aliases: [" "],
    usage: "suggest <suggestion>",
    run: async(client, message, args, util) => {
        const channel = await db.fetch(`suggestionChannel_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`:x: | Suggestion Channel Missing`)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(noChannel)

        }
        if(!args.length) {
            const noArgs = new MessageEmbed()
            .setDescription(`:x: | Suggestion Missing`)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(noArgs)

        }

        try {
            const suggested = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(args.join(" "))
            .setColor(client.colors.orange)
            .setTimestamp()
            .addField(`Status`, `:bar_chart: Awaiting Community Vote`)
            client.channels.cache.get(channel).send(suggested)
            .then(async(m) => {
                await m.react("🔼")
                await m.react("🔽")
            })
            .then(async() => {
                const success = new MessageEmbed()
                .setDescription(`:white_check_mark: | Suggestion Posted In <#${channel}>`)
                .setColor(client.colors.green)
                .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(success)

            })
            .catch(async() => {
                const noPerms = new MessageEmbed()
                .setDescription(`:x: | Client Permissions Invalid`)
                .setColor(client.colors.red)
                .setFooter(`© Zero Development`, client.user.displayAvatarURL())
message.channel.send(noPerms)

            })
        } catch {
            return message.channel.send(":x: | Error Detected")
        }

        
    }
}