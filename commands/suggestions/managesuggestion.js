const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "managesuggestion",
    category: "Suggestions",
    description: "Manage A Suggestion.",
    aliases: ["mg"],
    usage: "managesuggestion <messageID>",
    run: async(client, message, args, util) => {
        const channel = db.fetch(`suggestionChannel_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`:x: | Suggestion Channel Missing`)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(channel)

        }
        if(!args[0]) {
            const noArgs = new MessageEmbed()
            .setDescription(":x: | Message ID Missing")
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

message.channel.send(noArgs)

        }

        let accept = new MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Accept")
        .setCustomID(`${message.id}accept`)
        let deny = new MessageButton()
        .setStyle("DANGER")
        .setLabel("Decline")
        .setCustomID(`${message.id}decline`)
        let row = new MessageActionRow()
        .addComponents(accept, deny)

        try {
            const suggestedEmbed = await message.guild.channels.cache.get(channel).messages.fetch(args[0])
    
            const data = suggestedEmbed.embeds[0]
    
            const suggestion = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor(data.color)
            .addField(`${data.fields[0].name}`, `${data.fields[0].value}`, data.fields[0].inline)
    
            const msg = await message.channel.send(suggestion) ({ components: [row] })

            const filter = (i) => i.user.id === message.author.id;
            const collector = msg.createMessageComponentInteractionCollector(filter, { time: 30000 });

            collector.on("collect", async(button) => {
                if(button.customID === `${message.id}accept`) {
                    const accepted = new MessageEmbed()
                    .setAuthor(data.author.name, data.author.iconURL)
                    .setDescription(data.description)
                    .setColor(client.colors.green)
                    .addField(`Status`, `Accepted`)

                     suggestedEmbed.edit(accepted)
                    .then(async() => {
                        await suggestedEmbed.reactions.removeAll();
                    })

                    collector.stop();

                    button.update({
                        embeds: [accepted],
                        components: [row]
                    })

                } else if(button.customID === `${message.id}decline`) {
                    const denied = new MessageEmbed()
                    .setAuthor(data.author.name, data.author.iconURL)
                    .setDescription(data.description)
                    .setColor(client.colors.red)
                    .addField(`Status`, `Denied`)

                    await suggestedEmbed.edit({
                        embeds: [denied]
                    })
                    .then(async() => {
                        await suggestedEmbed.reactions.removeAll();
                    })

                    collector.stop();

                    button.update({
                        embeds: [denied],
                        components: [row]
                    })
                }
            })

            collector.on("end", async() => {
                accept = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel("Accept")
                .setCustomID(`${message.id}accept`)
                .setDisabled(true)
                deny = new MessageButton()
                .setStyle("DANGER")
                .setLabel("Decline")
                .setCustomID(`${message.id}decline`)
                .setDisabled(true)
                row = new MessageActionRow()
                .addComponents(accept, deny)

                const endEmbed = new MessageEmbed()
                .setAuthor(data.author.name, data.author.iconURL)
                .setDescription(data.description)
                .setColor(data.color)
                .addField(`${data.fields[0].name}`, `${data.fields[0].value}`, data.fields[0].inline)

                msg.edit(endEmbed)
            })
        } catch {
            return message.channel.send(":x: | Error Detected")
        }
    }
}
