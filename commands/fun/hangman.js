const { hangman } = require('reconlx')

module.exports = {
     name: "hangman",
  aliases: [],
  description: "Play a game of hangman with a friend!",
  usage: "hangman",
    run : async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You cannot use this command!.')
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send('Please specify a channel')
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send('Please specify a word to guess.')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}