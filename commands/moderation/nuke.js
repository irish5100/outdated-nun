const Discord = require("discord.js");
const client = new Discord.Client();
const nuke = require("discord-channel-nuke");
const { Color } = require("../../config.js");
var prefix = "!"; // your prefix
//client.on("message", message => {

module.exports = {
  name: "nuke",
  aliases: [],
  description: "Deletes All Messages From A Given Channel!",
  usage: "nuke",
  run: async (client, message, args) => {

  
// let Reason = args.slice(1).join(" ");

client.on("message", message => {
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.substring(prefix.length).split("")
    if(message.author.bot) return
    if(message.channel.type === "dm") return
    switch(args[0]){
        case 'bleh':
            message.channel.send('Are you sure you would like to continue? Yes or No')
        
            let filter = m => m.author.id === message.author.id
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 3000, // u can modify how much time 
                errors: ['time']
            })
            .then(message => {
                message = message.first()
                if(message.content.toLowerCase() === 'yes' || message.content.toLowerCase() == 'y'){
                    message.channel.send(':white_check_mark: Completed')
                } else if(message.content.toLowerCase() === 'no' || message.content.toLowerCase() =='n'){
                    message.channel.send(':x: Cancelled')
                } else {
                    message.channel.send('Invalid respose')
                }
            })
            .catch(collected => {
                message.channel.send(':x: Command Timed Out.')
            })
 
        }})
    
    
  
if(message.content.toLowerCase() === prefix + "nuke"){

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Invalid Permissions. \n\n> `ADMINISTRATOR`\n\n");

  
  
  
nuke(message, new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Channel Nuked!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
//        .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
        .setImage(`https://media0.giphy.com/media/oe33xf3B50fsc/200.gif`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp()
//        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
)

}
}};