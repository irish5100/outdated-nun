const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "announce",
  description: "Announce something in a channel",
  usage: "announce <channel> <text>",
  run: async (client, message, args) => {
    message.delete();
    if (!args[0]) {
      return message.channel.send(
        "Please provide text or a valid channel."
      );
    }

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        ":x: Invalid Permissions - Needed Permission(s)/n`ADMINISTRATOR`"
      );

    const announceChannel = '944331341674188860'
    let channel = message.mentions.channels.first();
    let text;

    if (channel) {
      text = args.splice(1).join(" ");
    } else if (announceChannel !== null) {
      channel = announceChannel;
      text = args.join(" ");
    } else {
      return message.channel.send("Please provide text or a valid channel");
    }

    const embed = new MessageEmbed()
      .setTitle("📢 Announcement 📢")
      .setDescription(text)
      .setFooter(message.author.username)
      .setColor("BLURPLE");

    client.channels.cache.get(message.channel.id).send(embed);
  },
}