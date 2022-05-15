
const Discord = require('discord.js');
const { Prefix, Noodleskey } = require("../../config.js");
const fetch = require('node-fetch')

module.exports = {
    name: 'drake',
    aliases: [],
    description: 'Create A Drake Meme!',
    usage: `drake <text>`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

  run: async (client, message, args) => {
        const split = args.join(" ").split("/")/// you can put anything here not just | it can also be words or other symbol
        const user = split[0];
        const user2 = split[1]
        const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/drake/?text1=${user}&text2=${user2}`, {
            headers: {
                'APIKEY': Noodleskey,
            }
        });
        let Image = await res.buffer();
        const cmm = new Discord.MessageAttachment(Image);
        message.channel.send(cmm);

    }

}
