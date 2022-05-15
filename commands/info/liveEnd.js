const Discord = require('discord.js')
module.exports = {
  name: "liveEnd",
  aliases: ["le"],
  description: "Irish Is No Longer Live!",
  usage: "liveEnd <Message>",
  run: async (client, message, args) => {
    
          if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
                return message.channel.send(":x: Invalid Permissions - Needed Permission(s)/n`Twitch Streamer`")
        }  
let dMessage = args.slice(0).join(" ")
 if (dMessage.length < 1) return message.reply(':x: | Please Specifiy A Message To Send');


        const mess = await message.channel.send("Sending Ended Live Alert...")
      setTimeout(() => {
          const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('<:5163dndstatus:975395155228127263> | Irish Is No Longer Live!')
        .addField('<:1717pencil:975395155253264434> Status', `<:954504350045188127:975395155173580830> Currently Not Live`)
        .addField('<:4246serverdiscovery:975395154775138306> Url', `[URL](https://www.twitch.tv/kingluke77)`)
        .setFooter(`${dMessage}`)
        .setTimestamp()
message.channel.send(embed);
      mess.delete()
      }, 900)

    }
}