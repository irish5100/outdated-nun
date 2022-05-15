const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "Bans a member from the server!",
  usage: "ban <Mention Member>",
  run: async (client, message, args) => {
    //Start
    
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command Idiot!`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `Please Mention A Member That You Want To Ban!`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`Please Mention A Valid Member!`);

    if (Member.id === message.author.id)
      return message.channel.send(`You Can't Ban Your Self!`);

    if (Member.id === client.user.id)
      return message.channel.send(`Please Don't Ban Me ;-;`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`You Can't Ban The Owner!`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.bannable) return message.channel.send(`I Can't Ban That Member!`);

    try {
      console.log(`Member Is Going To Get Ban!`);
      setTimeout(function() {
        User.ban({ reason: `${Reason || "No Reason Provided!"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Member Banned!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
        .addField(`Banned Member`, `${Member.tag} (${Member.id})`)
        .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
        .setImage(`https://c.tenor.com/5U9sdA4-tdIAAAAC/ban-banned.gif`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false);
        
        const banMessage = new MessageEmbed()
            .setDescription(`:x: | You Have Been Banned`)
            .addField(`Guild Name`, `${message.guild.name} (${message.guild.id})`)
            .addField(`Moderator`, `${message.author.tag} (${message.author.id})`)
            .addField(`Reason`, `${Reason}`)
            .setColor("RED")
            .setFooter(`To report abuse please create a ticket in https://discord.gg/QEbKfjc4jw`)
            .setTimestamp()

      Member.send(banMessage)  
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) Just Got Banned From ${
          message.guild.name
        } For ${Reason || "No Reason Provided!"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `I Can't Ban That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
