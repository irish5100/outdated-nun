const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unban",
  aliases: [],
  description: "Unban A Member!",
  usage: "Unban <Member ID>",
  run: async (client, message, args) => {
    //Start
    
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command Pleb!`
      );

    if (!args[0])
      return message.channel.send(
        `Please Give Me Member ID That You Want To Unban!`
      );

    if (isNaN(args[0])) return message.channel.send(`Please Give Me Valid ID!`);

    if (args[0] === message.author.id)
      return message.channel.send(`You Are Not Banned!`);

    if (args[0] === message.guild.owner.user.id)
      return message.channel.send(`The Server Owner Is Not Banned!`);

    if (args[0] === client.user.id)
      return message.channel.send(`I Am Not Banned!`);

    let FetchBan = await message.guild.fetchBans();

    let Member;
    Member =
      FetchBan.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      FetchBan.get(args[0]) ||
      FetchBan.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );

    if (!Member)
      return message.channel.send(
        "Please Give Valid Member ID Or Member Is Not Banned!"
      );

    let Reason = args.slice(1).join(" ") || "No Reason Provided!";

    try {
      message.guild.members.unban(Member.user.id, Reason);
    } catch (error) {
      return message.channel.send(
        `I Can't Unban That Member Maybe Member Is Not Banned Or Some Error!`
      );
    }

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Member Unbanned!`)
      .addField(`Moderator`, `${message.author.tag} (${message.author.id}}`)
      .addField(`Unbanned Member`, `${Member.user.tag} (${Member.user.id}`)
      .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    return message.channel.send(embed);

    //End
  }
};