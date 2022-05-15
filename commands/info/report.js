const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "report",
  aliases: [],
  description: "Report Something To Staff!",
  usage: "report",
  run: async (client, message, args, discord, bot) => {
    
       const embed = new Discord.MessageEmbed()// make embeds so you can style your text messages
        const embed2 = new Discord.MessageEmbed()
        const filter = m => m.author.id === message.author.id; // checks if the author of the first message is responding
        embed
            .setTitle(':no_entry: | Report')
            .setThumbnail('')
            .setDescription('Whats your discord name?')
            .setFooter('Type `cancel` to cancel the report process')
            .setColor('#f50057')
        message.channel.send(embed); // sends the embed
        message.channel.awaitMessages(filter, {  // puts a filter on the response time and how many mesages you cna send / respond
            max: 1,
            time: 120000
        }).then(collected => {
            let Discordname = collected.first().content; // gets the first word of the messages and saves it as your discord name
            if (collected.first().content === "cancel") {
                return message.channel.send("Canceled");
            }

                                    const embed = new MessageEmbed()
            .setTitle(':no_entry: | Report')
                .setThumbnail('')
                .setDescription('Who do you want to report?')
                .setFooter('Type `cancel` to cancel the report process')

                .setColor('#f50057')
            message.channel.send(embed).then( // sends the message then waits for a message .then is like await it waits for a message
                message.channel.awaitMessages(filter, { // filter again
                    max: 1,
                    time: 120000
                }).then(collected => {
                    let Ign = collected.first().content;
                    if (collected.first().content === "cancel") {
                        return message.channel.send("Canceled");
                    }

                                    const embed = new MessageEmbed()
                        .setTitle(':no_entry: | Report')
                        .setThumbnail('')
                        .setDescription('Why are you reporting this?')
                        .setFooter('Type `cancel` to cancel the report process')
                        .setColor('#f50057')
                    message.channel.send(embed).then( //same thing
                        message.channel.awaitMessages(filter, { // same thing
                            max: 1,
                            time: 120000
                        }).then(collected => {
                            let BugDesc = collected.first().content;
                            if (collected.first().content === "cancel") {
                                return message.channel.send("Canceled");
                            }

                                    const embed = new MessageEmbed()
                                .setTitle(':no_entry: | Report')
                                .setThumbnail('')
                                .setDescription('Are you sure you want to submit this report?')
                                .addField(`All reports are logged and monitored by Head Administration.`, `All troll submissions will be automatically deleted and may lead to a blacklist.`)
                                .setFooter('Yes / No / Cancel')
                                .setColor('#f50057')
                            message.channel.send(embed).then(// same thing
                        message.channel.awaitMessages(filter, { // same thing
                            max: 1,
                            time: 120000
                        }).then(collected => {
                            let BugDesc = collected.first().content;
                            if (collected.first().content === "cancel") {
                                return message.channel.send("Canceled");
                            }


                                        if (collected.first().content.toLowerCase() === "yes") { // if its yes then send the following
                                            message.channel.bulkDelete(9 + 1, true) // deltes all the question and answers to keep it clean in the channel
         const DiscordChannel = client.channels.cache.find(x => x.id == "941398223988351037")
                                    const finalEmbed = new MessageEmbed()
                                                .setTitle(':no_entry: | Report Received')
                                                .setThumbnail('')
                                                .addField('Submitted By', `${message.author.tag}`)
                                                .addField('Reporters name:', Discordname, true)
                                                .addField('Reported Person:', Ign, false)
                                                .addField('Report Reason:', BugDesc, true)
                                                .setColor('#f50057')
                                            DiscordChannel.send(finalEmbed) // sends a message to the channel where the report was done that the report was submited
                                    const embed2 = new MessageEmbed()
                                                    .setTitle(':no_entry: | Report')
                                                    .setThumbnail('')
                                                    .setDescription('Report Submitted Successfully')
                                                    .setFooter(`If it is urgent, create a ticket or contact Zero Development`)
                                                    .setColor('#f50057')
                                                message.channel.send(embed2)
                                            
                                        } else { // if tis no the send this
                                            message.channel.send("Canceled");
                                        }
                                    })


                              
                            )

                        
                    
                
            
        })

    
                      )
                })
            )
        }
               )}
};