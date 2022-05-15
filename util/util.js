const { MessageEmbed } = require('discord.js');

module.exports.errorEmbed = async function(client, message, content, color) {
    if(!client) throw new Error("[Utils] Error - client must be provided")
    if(!message) throw new Error("[Utils] Error - message must be provided")
    if(!content || typeof content !== 'string') throw new TypeError("[Utils] Error - content must be a string")
    if(!color || typeof color !== 'string') throw new TypeError("[Utils] - Error - color must be a string")

    const errorEmbed = new MessageEmbed()
    .setDescription(content)
    .setColor(color)
    .setFooter(`© Zero Development`, client.user.displayAvatarURL())

    await message.channel.send({
        embeds: [errorEmbed]
    })
}