
const Discord = require('discord.js');
const { prefix, Noodleskey } = require(`../../config`);
const fetch = require('node-fetch')

module.exports = {
    name: 'love',
    aliases: [],
    description: 'Love Someone!',
    usage: `love <target>`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
    
    
const [user, user2] = message.mentions.users.keyArray();

    
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=ship&user1=${message.user.displayAvatarURL({ format: "png", size: 512 })}&user2=${message.user2.displayAvatarURL({ format: "png", size: 512 })}`));
            let json = await res.json();
            //let attachment = new Discord.MessageAttachment(json.message, "love.png");

            let e = new Discord.MessageEmbed()
 
          
                .setAuthor(`${user.tag} 💟 ${user2.tag}`)
                .setColor(`${message.client.ecolor}`)
                .setTimestamp()
                .setFooter(`Executed by ${message.author.tag}`)
                .setImage(`${json.message}`)
            message.channel.send(e);

    }}
