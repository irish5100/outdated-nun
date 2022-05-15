const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");
const client = new Discord.Client();

module.exports = {
    name: "bug",
    description: "Sends Your Reported Issue To The Staff Team.",

  run: async(client, message, args) => {
        if(!args[0]) return message.reply('Please specify a issue!')

        message.reply(`✉ | ${message.author.username}, Thanks for reporting this issue! :)`)

          let Bug = args.slice(0).join(" ")
          
  //  const bugChannel = client.channels.cache.get('941398223988351037'); // Replace with your channel id
           const bugChannel = await client.channels.cache.find(x => x.id == "941398223988351037")

    
    console.log('Bug: ' + `(username)` + message.author.username,'#'+message.author.discriminator, `(UserId)`+ message.author.id, `(serverName)`+message.guild.name, `(serverId)`+ message.guild.id)
       
 const bug = new MessageEmbed()
            .setDescription(`:x: | Bug Report Received`)
            .addField(`Guild Name`, `${message.guild.name} (${message.guild.id})`)
            .addField(`Member`, `${message.author.tag} (${message.author.id})`)
            .addField(`Bug`, `${Bug}`)
            .setColor("RED")
            .setFooter(`© Zero Development 2022`)
            .setTimestamp()
 bugChannel.send(bug)      
                 }}
