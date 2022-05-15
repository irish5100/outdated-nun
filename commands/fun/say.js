const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "say",
  aliases: ["say",],
  description: "get the bot to repeat a message!",
  usage: "say <message>",
  run: async (client, message, args) => {
    //Start
        message.delete()

        if (!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));
        
        if (args.length < 1)
            return message.channel.send('You must specify something for the bot to repeat!').then(m => m.delete({timeout: 5000}));

        if (args[0].toLowerCase() === 'embed') {
            const embed = new MessageEmbed()
                .setColor(process.env.COLOR)
                .setDescription(args.slice(1).join(' '))

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(' '));
        }
    }
}
    //End