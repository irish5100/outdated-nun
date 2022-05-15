require('dotenv').config();
const { Client } = require('discord.js');
const client = new Client();
const createCaptcha = require('captcha');
const fs = require('fs').promises;
const role_id = process.env.ROLE_TOO_GET;
client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('guildMemberAdd', async member => {
    const captcha = await createCaptcha();
    try {
        const msg = await member.send('You have 60 seconds to solve the captcha', {
            files: [{
                attachment: `${__dirname}/captchas/${captcha}.png`,
                name: `${captcha}.png`
            }]
        });

        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send('You entered the captcha incorrectly.');
                    return false;
                }
            };

            const response = await msg.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time']});
            if(response) {
                await msg.channel.send('You have been verified! Enjoy the server!');
                await member.roles.add(`${role_id}`);
                await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
                    .catch(err => console.log(err));
            }
        }

        catch(err) {
            console.log(err);
            await msg.channel.send('You did not solve the captcha correctly on time.');
            await member.kick();
            await fs.unlink(`${__dirname}/captchas/${captcha}.png`).catch(err => console.log(err));
        }
    } catch(err) { console.log(err); }

});