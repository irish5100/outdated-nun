const Discord = require('discord.js');
const { prefix, Noodleskey } = require(`../../config`);
const fetch = require('node-fetch')

module.exports = {
    name: 'changemymind',
    aliases: ["cmm"],
    description: 'change your mind about something!',
    usage: `changemymind <text>`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  run: async (client, message, args) => {
        const words = args.join(" ")
        const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/changemymind?text=${words}`, {
            headers: {
            'APIKEY': Noodleskey,
            }
            });
            let Image = await res.buffer();
            const cmm = new Discord.MessageAttachment(Image);
            message.channel.send(cmm);
                    
    }
}