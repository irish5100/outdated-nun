const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color, Prefix } = require("../../config.js");

module.exports = {
  name: "forceoff",
  aliases: ["botstop"],
  description: "Stops The Bot",
  usage: "forceoff",
  run: async(client, message, args) => {
    
        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
                return message.channel.send(":x: Invalid Permissions - Needed Permission(s)/n`Bot Developer`")
        }

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
      
    let embed = new MessageEmbed()
    .setColor(`RED`)
        .setTitle(`Bot Stopped`)
        .setDescription(`The bot has been stopped.`)
        .addField(`Developer`, `${message.author.tag} (${message.author.id}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
    
    if (!args.length) return message.channel.send(embed);

         process.exit();


    } 
    }