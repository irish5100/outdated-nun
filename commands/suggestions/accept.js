const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "accept",
    category: "Suggestions",
    description: "Accept A Suggestion.",
    aliases: [" "],
    usage: "accept <messageID> [reason]",
    run: async(client, message, args, util) => {
      
    if (!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(`:x: Invalid Permissions | Needed Permission(s) \n\n> Staff Member`)
        }
        const channel = db.fetch(`suggestionChannel_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`:x: | Suggestion Channel Missing`)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(noChannel)
        }
        if(!args[0]) {
            const noArgs = new MessageEmbed()
            .setDescription(":x: | Message ID Missing")
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(noArgs)
        }

        try {
            const suggestedEmbed = await message.guild.channels.cache.get(channel).messages.fetch(args[0])
    
            const data = suggestedEmbed.embeds[0]
    
            const accepted = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor(client.colors.green)
            .addField(`Status`, `Accepted`)
            .addField(`Reason`, `${args.slice(1).join(" ") || "No Reason Provided!"}`)
    
message.channel.send(accepted)

            .then(async() => {
                await suggestedEmbed.reactions.removeAll();
            })
            .then(async() => {
                const success = new MessageEmbed()
                .setDescription(`:white_check_mark: | Suggestion Accepted`)
                .addField(`Suggestion ID`, `${args[0]}`)
                .setColor(client.colors.green)
                .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(success)

            })
        } catch {
            return message.channel.send(":x: | Error Detected")
        }
    }
}