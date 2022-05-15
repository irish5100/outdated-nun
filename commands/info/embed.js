const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "embed",
  aliases: ["saye"],
  description: "Sends a Custom Embed!",
  usage: "embed <Description>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const sayEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }))
        .setDescription(args.join(" "))
        .setTimestamp()
        .setColor("BLURPLE")

    message.channel.send(sayEmbed)
  },
};