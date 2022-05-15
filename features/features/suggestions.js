const { MessageEmbed } = require('discord.js')
const suggestionSchema = require('../../models/suggestions.js')

const statusMessages = {
  WAITING: {
    text: '📊 Waiting for feedback',
    color: 0xffea00,
  },
  ACCEPTED: {
    text: '✅ Suggestion accepted | Expect to see this installed shortly.',
    color: 0x34eb5b,
  },
  DENIED: {
    text:
      '❌ Suggestion denied | This will not be added, sorry.',
    color: 0xc20808,
  },
}

let suggestionCache = {} // { guildId: channelId }

const fetchSuggestionChannels = async (guildId) => {
  let query = {}

  if (guildId) {
    query._id = guildId
  }

  const results = await suggestionSchema.find(query)

  for (const result of results) {
    const { _id, channelId } = result
    suggestionCache[_id] = channelId
  }
}

module.exports = (client) => {
  fetchSuggestionChannels()

  client.on('message', (message) => {
    const { guild, channel, content, member } = message

    const cachedChannelId = suggestionCache[guild.id]
    if (cachedChannelId && cachedChannelId === channel.id && !member.user.bot) {
      message.delete()

      const status = statusMessages.WAITING

      const embed = new MessageEmbed()
        .setColor(status.color)
        .setAuthor(member.displayName, member.user.displayAvatarURL())
        .setDescription(content)
        .addFields({
          name: 'Status',
          value: status.text,
        })
        .setFooter('To suggest something, type your suggestion in this channel.')
message.channel.send(embed)
      channel.send(embed).then((message) => {
        message.react('👍').then(() => {
          message.react('👎')
        })
      })
    }
  })
}

module.exports.fetchSuggestionChannels = fetchSuggestionChannels

module.exports.statusMessages = statusMessages

module.exports.suggestionCache = () => {
  return suggestionCache
}