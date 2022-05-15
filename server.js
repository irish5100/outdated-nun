const Discord = require("discord.js");
const fs = require("fs");
const fetch = require('node-fetch')
// const client = new Discord.Client();
const { Client, Intents } = require('discord.js');
// const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES  ]})// const bot = new Discord.Client();
const Solar = require('./util/solar');
const client = new Solar({ intents: [Intents.ALL] }, { allowedMentions: { parse: ['users', 'roles'], repliedUser: false } });
const { readdirSync, read } = require('fs');
const { join } = require('path');
const Levels = require('discord-xp');
const ms = require('ms')
const { Prefix, Token, Color, token, MongooseConnectionString } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = require("quick.db");
const dotenv = require("dotenv");
dotenv.config();
 client.on("ready", async () => {
  console.log(`ready!`);
  client.user
   .setActivity(`Chat | Mention Me!`, { type: "WATCHING" })
// BOT IS UNDER MAINTENANCE.... PLEASE WAIT
 .catch(error => console.log(error));
 });

/*
module.exports = {
    name: "gatekeeper",
    description: "Sends a message when someone joins/leaves the server.",

  run: async(client, message, args) => {

client.on("GUILD_MEMBER_ADD", member => {
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '941398223988351037')
   welcomeChannel.send (`${member} joined ${message.guild.name}`)
})

 client.on("GUILD_MEMBER_REMOVE", member => {
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '941398223988351037')
   welcomeChannel.send (`${member} left ${message.guild.name}`)
})
  }}
*/

client.on('GUILD_MEMBER_ADD', (guildMember) => {
   guildMember.addRole(guildMember.guild.roles.find(role => role.id === "966260323956965397"));
});

module.exports = (client, message) => {
  if(message.content === 'Bump done! :thumbsup:') {
    const pingRole = message.guild.roles.cache.find(role => role.name === 'Bump Reminder');
    message.channel.send('Thank you for bumping this server. Please check back two hours later to bump the server again.')
    setTimeout(() => message.channel.send(`${pingRole} chop-chop! It's time to bump the server! 😃`), 7200000);
  }
};


    client.on('message', async message => {
    if (message.content === (`!bumpreminder`)) {
        message.channel.send("Reminder has been set! Members will be reminded to bump the server every two hours!")
        var role = message.guild.roles.cache.find(role => role.name === "Bump Reminder")
        let intervalOne = setInterval(() => {
            message.channel.send(`${role} chop-chop! It's time to bump! 😃`)
        }, 7200000);
        
        
    
    }
      
      
 
});
    client.on('message', async message => {
        if (message.content === "!d bump") {
            message.channel.send("Thank you for bumping the server. Please check back two hours later to bump the server again.")
      let intervalOne = setInterval(() => {
        }, 7200000);
            clearInterval(intervalOne)
             .then(setInterval(intervalOne)) | message.channel.send("I have successfully restarted the timer. You will get notified in two hours' time!")
        }



    });

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Bot Info`)
      .setDescription(`Hello ${message.author.tag}`)
      .addField(`Prefix`, `${Prefix}`)
      .addField("Important Links", "[Website](https://zerodevelopment.ml) | [Support Server](https://discord.gg/QEbKfjc4jw)")
      .setFooter(`© Zero Development 2022`)
      .setTimestamp()
    message.channel.send(embed)
  }
});

let modules = ["fun", "info", "moderation", "suggestions"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
      return new Error(
        "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
      );
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} Command Has Been Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      //if (command.aliases.length === 0) command.aliases = null;
    });
  });
});


client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (!message.content.startsWith(Prefix)) return;

  const args = message.content
    .slice(Prefix.length)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (command) {
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "I Don't Have Enough Permission To Use This Or Any Of My Commands | Require : Administrator"
      );
    command.run(client, message, args);
  }
  console.log(
    `User : ${message.author.tag} (${message.author.id}) Server : ${message.guild.name} (${message.guild.id}) Command : ${command.name}`
  );
  
});

//start anti-spam
/*
const usersMap = new Map();
const LIMIT = 7;
const TIME = 1800000;
const DIFF = 3000;

// client.on('message', async(message) => {
client.on('message', async(message) => {
    if(message.author.bot) return;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 7;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'Muted');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            name : "muted",
                            permissions: []
                        })
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
                message.member.roles.add(muterole);
             message.reply(':x: Spamming Is Prohibited | Action(s) Taken: \n> Mute\n');
                setTimeout(() => {
                    message.member.roles.remove(muterole);
            message.reply(':white_check_mark: Mute Timeout Reached | Action(s) Taken: \n> Unmute\n');
                }, TIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 7,
            lastMessage : message,
            timer : fn
        });
    }
})
*/
//end

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  
  // -------------------------------------- Blaclisted Words
  
})
client.on('message', msg => {
  if (msg.content.includes("nigga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Nigga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nIgga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niGga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nigGa")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niggA")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niga")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("NIGGA")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');

  }
});
client.on('message', msg => {
  if (msg.content.includes("nigger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Nigger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nIgger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niGger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("nigGer")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niggEr")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niggeR")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("niger")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("NIGGER")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("cunt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Cunt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("cUnt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("cuNt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("cunT")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("CUNT")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faggot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Faggot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fAggot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faGgot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fagGot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faggOt")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faggoT")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fagot")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("FAGGOT")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fag")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("Fag")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("fAg")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("faG")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});
client.on('message', msg => {
  if (msg.content.includes("FAG")) {
    msg.delete()
    msg.reply('Blacklisted Word Detected | Action(s) Taken: \n> `Warning`\n');
  }
});

  // -------------------------------------- Blaclisted Words End

client.on('message', msg => {
  if (msg.content.includes("discord.gg")) {
    msg.delete()
    msg.reply("Invite Link Detected | Action(s) Taken: \n> `Message Deleted`\n")
  }
});
client.on('message', msg => {
  if (msg.content.includes("Discord.gg")) {
    msg.delete()
    msg.reply("Invite Link Detected | Action(s) Taken: \n> `Message Deleted`\n")
  }
})

/*
client.on('message', msg => {
  if (msg.content.includes("https://")) {
    msg.delete()
    msg.reply("Link Detected | Action(s) Taken: \n> `Message Deleted`\n")
  }
});
client.on('message', msg => {
  if (msg.content.includes("https://www")) {
    msg.delete()
    msg.reply("Link Detected | Action(s) Taken: \n> `Message Deleted`\n")
  }
});
*/


//client.on('message', msg => {
  //if (msg.content.includes("-musicon")) {
    //msg.reply("Sorry That command is not working right now as the hosting servers are down! Sorry again!")
  //}
//});
client.on('message', msg => {
  if (msg.content === 'help') {
    msg.reply('If you need help with anything make sure you create a ticket in ||<#OLD>||. (THIS IS A AUTOMATED MESSAGE)');
  }
});
client.on('message', msg => {
  if (msg.content.includes("didntask")) {
    msg.reply('Uno Reverse!');
  }
});
client.on('message', msg => {
  if (msg.content.includes("@everyone")) {
    msg.reply('bruh why ping everyone..... ;-;');
  }
});
client.on('message', msg => {
  if (msg.content.includes("<@!829438800295624716>")) {
    msg.reply("Don't ping Irish.");
  }
});
client.on('message', msg => {
  if (msg.content.includes("@Irish")) {
    msg.reply("Please Don't ping Irish.");
  }
});
client.on('message', msg => {
  if (msg.content.includes("DEV.ONLINE")) {
    msg.reply(`Bot Status: 🟢  -  Ping: ${client.ws.ping}`);
  }
});
client.on('message', msg => {
  if (msg.content.includes("economy")) {
    msg.reply(`⚠️⚠️ Economy commands are experiencing errors, these commands might not work. ⚠️⚠️`);
      msg.send(`Fix ETA ~ 9Th Dec 2022 13:00 PT/nSorry for any inconvenience.`);
  }
});
client.on('message', msg => {
  if (msg.content.includes(".give tnt 64")) {
    msg.delete()
    msg.reply(`Giving TnT x64...`)
    msg.reply(`*Gives 64 TnT* Done! Dont use it all at once!`);  }
});


//----------------------------------------------------------------------------------------------- LOGGING START

//----------------------------------------------------------------------------------------------- LOGGING END




 // make sure you have ms installed by doing npm install ms in your console/terminal
const prefix = "."

client.once("ready" , () =>{
    console.log("I am online!")
});


           client.on('message', async message => {
               
              let args = message.content.substring(prefix.length).split(" ")
              if(message.content.startsWith(`${prefix}giveaway`)) {
                
        if (message.author.id !== '000000000000000000') {
        if (message.author.id !== '829438800295624716')
                return message.channel.send(":x: Invalid Permissions - Needed Permission(s)/n`Staff Member`")
        }
           
                  let time = args[1]
                  if (!time) return message.channel.send('Missing Argument: | \n> `Please specify a time.`\n');
          
                  if (
                      !args[1].endsWith("d") &&
                      !args[1].endsWith("h") &&
                      !args[1].endsWith("m") &&
                      !args[1].endsWith("s") 
                  )
                      return message.channel.send('Missing Argument: |  \n> `You need to use d (days), h (hours), m (minutes), or s (seconds).`\n')
          
                      let gchannel = message.mentions.channels.first();
                      if (!gchannel) return message.channel.send("Missing Argument: |  \n> `What channel would you like the giveaway in?`\n")
          
                      let prize = args.slice(3).join(" ")
                      if (!prize) return message.channel.send('Missing Argument: | \n> `What is the prize?`\n')
          
                      message.delete()
                      gchannel.send(":tada: **Giveaway Started!** :tada:")
                      let gembed = new Discord.MessageEmbed()
                          .setTitle("New Giveaway!")
                          .setDescription(`React with :tada: to enter the giveaway!\nHosted By: **${message.author}**\nTime: **${time}**\nPrize: **${prize}**`)
                          .setTimestamp(Date.now + ms(args[1]))
                          .setColor(3447003)
                      let n = await gchannel.send(gembed)
                      n.react("🎉")
                      setTimeout(() => {
                          if(n.reactions.cache.get("🎉").count <= 1) {
                              return message.channel.send("Error: \n> `Not enough people to draw a winner.`\n")
                          }
          
                          let winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
                          gchannel.send(`Congratulations ${winner}! You just won **${prize}**!`
                          );
                      }, ms(args[1]));
              }
            })





//levels

// Levels.setURL("C")

//end

///////////////////////////////////////////////////////////////// NEW
// const Client = new Discord.Client({disableEveryone: true, partials: ['MESSAGE', 'REACTION']});

client.on('messageReactionAdd', async (reaction, user) => {
    const handleStarboard = async () => {
        const SBChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === '⭐starboard');
        const msgs = await SBChannel.messages.fetch({ limit: 100 });
        const SentMessage = msgs.find(msg => 
            msg.embeds.length === 1 ?
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(SentMessage) SentMessage.edit(`${reaction.count} - ⭐`);
        else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
            .setDescription(`**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`)
            .setColor('YELLOW')
            .setFooter(reaction.message.id)
            .setTimestamp();
            if(SBChannel)
            SBChannel.send('1 - ⭐', embed);
        }
    }
    if(reaction.emoji.name === '⭐') {
        if(reaction.message.channel.name.toLowerCase() === '⭐starboard') return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
        handleStarboard();
    }
});

///////////////////////////////////////////////////////////////// NEW


////////////////////////////////////////////////////////////// DM Logger start

client.on("message", async message => {
    if(message.guild) return;
if(message.author.id === client.user.id) return;
const DMmessages = client.channels.cache.find(channel => channel.id === '941398223988351037')
let embed = new Discord.MessageEmbed()
  .setTitle("Direct Message Received")
  .addField("Message Sender: ", message.author.tag)
  .addField("Message Senders ID: ", message.author.id)
  .addField("Message Content: ", message.content)
  .setThumbnail(message.author.avatarURL({ dynamic: true }))
  .setTimestamp()
  .setColor("BLURPLE")
DMmessages.send(embed)
})



client.on("message", async message => {
    if(message.guild) return;
if(message.author.id === client.user.id) return;
let DMmessages = client.users.cache.get("941398223988351037")
let embed = new Discord.MessageEmbed()
.setTitle("Direct Message Received")
.addField("Message By: ", message.author.tag)
.addField("Message Content: ", message.content)
.setDescription(`Hello,
We see that you have direct messaged this bot. As of for now we do not support DM commands, please use commands in a server channel.
~ Zero Development Team`)
.setThumbnail(message.author.avatarURL({ dynamic: true }))
.setFooter(`To report abuse please create a ticket in https://discord.gg/QEbKfjc4jw`)
.setTimestamp()
.setColor("BLURPLE")
message.channel.send(embed)
})

////////////////////////////////////////////////////////////// DM Logger end

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

////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MUSIC SYSTEM START

require("dotenv").config();//Loading .env
const { Collection } = require("discord.js");

client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX,
  SOUNDCLOUD: process.env.SOUNDCLOUD_CLIENT_ID
}

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/music/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

//Logging in to discord
client.login(process.env.TOKEN)


////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~MUSIC SYSTEM EMD


////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ANTI SPAM SYSTEM START

const { MessageEmbed } = require("discord.js"); // Requiring this since we need it for embeds later

let authors = [];
let warned = [];
let punishedList = [];
let messageLog = [];

module.exports = async (client, options) => {
  /* Declaring our options which we are going to work on */
  
  const limitUntilWarn = (options && options.limitUntilWarn) || 3; // Default value: 3. Explication: This is the limit where you get the warn message. If the member X sent over 3 messages within the interval, he get warned
  const limitUntilMuted = (options && options.limitUntilMuted) || 5; // Default value: 5. Explication: This is the limit where you get Punished. If the member X sent over 5 messages within the interval, he get muted.
  const interval = (options && options.interval) || 2000; //Default Time: 2000MS (1000 milliseconds = 1 second, 2000 milliseconds = 2 seconds etc...). Explication: The interval where the messages are sent. Practically if member X sent 5+ messages within 2 seconds, he get muted
  const warningMessage = (options && options.warningMessage) || ":x: Spamming Is Prohibited | Action(s) Taken: \n> Warn\n"; // Default Message: if you don't stop from spamming, I'm going to punish you!. Explication: None, it's just a message you get for the warning phase.
  const muteMessage = (options && options.muteMessage) || ":x: Spamming Is Prohibited | Action(s) Taken: \n> Warn\n"; // Default Message: "was muted since we don't like too much advertisement type people!". Explication: The message sent after member X was punished
  const maxDuplicatesWarning = (options && options.maxDuplicatesWarning || 7); // Default value: 7. Explication: When people are spamming the same message, <limitUntilWarn> is ignored and this will trigger when member X sent over 7+ message that are the same.
  const maxDuplicatesMute = (options && options. maxDuplicatesMute || 10); // Deafult value: 10 Explication: The limit where member X get muted after sending too many messages(10+).
  const ignoredRoles = (options && options.ignoredRoles) || []; // Default value: None. Explication: The members with this role(or roles) will be ignored if they have it. Suggest to not add this to any random guys.
  const ignoredMembers = (options && options.ignoredMembers) || []; // Default value: None. Explication: These members are directly affected and they do not require to have the role above. Good for undercover pranks.
  const mutedRole = (options && options.mutedRole) || "Muted"; // Default value: muted. Explication: Here you put the name of the role that should not let people write/speak or anything else in your server. If there is no role set, by default, the module will attempt to create the role for you & set it correctly for every channel in your server. It will be named "muted".
  const timeMuted = (options && options.timeMuted) || 1000 * 600; // Default value: 10 minutes. Explication: This is how much time member X will be muted. if not set, default would be 10 min.
  const logChannel = (options && options.logChannel) || "mod-logs"; // Default value: "AhtiSpam-logs". Explication: This is the channel where every report about spamming goes to. If it's not set up, it will attempt to create the channel.

// If something is added wrong, throw an error

  if(isNaN(limitUntilWarn)) throw new Error("ERROR: <limitUntilWarn> option is not set up right! Please check it again to be a number in settings.");
  if(isNaN(limitUntilMuted)) throw new Error("ERROR: <limitUntilMuted> option is not set up right! Please add a number in settings.");
  if(isNaN(interval)) throw new Error("ERROR: <interval> option is not set up right! Please add a number in settings.");
  if(!isNaN(warningMessage) || warningMessage.length < 5) throw new Error("ERROR: <warningMessage> option must be a string and have at least 5 characters long (Including space).");
  if(!isNaN(muteMessage) || muteMessage.length < 5) throw new Error("ERROR: <muteMessage> option must be a string and have at least 5 characters long (Including space).");
  if(isNaN(maxDuplicatesWarning)) throw new Error("ERROR: <maxDuplicatesWarning> option is not set up right! Please check it again to be a number in settings.")
  if(isNaN(maxDuplicatesMute)) throw new Error("ERROR: <maxDuplicatesMute> option is not set up right! Please check it again to be a number in settings.");
  if(isNaN(timeMuted)) throw new Error("ERROR: <timeMuted> option is not set up right! Please check it again to be a number in settings.");
  if(ignoredRoles.constructor !== Array) throw new Error("ERROR: <ignoredRoles> option is not set up right! Please check it again to be an array in settings.");
  if(ignoredMembers.constructor !== Array) throw new Error("ERROR: <ignoredMembers> option is not set up right! Please check it again to be an array in settings.");
  
  // Custom 'checkMessage' event that handles messages
 client.on("checkMessage", async (message) => {
 
  //time variables
  let clock = new Date();
  let ss = String(clock.getSeconds()).padStart(2, '0');
  let min = String(clock.getMinutes()).padStart(2, '0');
  let hrs = String(clock.getHours()).padStart(1, '0');
  clock = hrs + ':' + min +':' + ss;

  let TheDate = new Date()
  let zilelesaptamanii = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let weekday = zilelesaptamanii[TheDate.getDay()];
  let dd = String(TheDate.getDate()).padStart(2, '0');
  let mon = String(TheDate.getMonth()+ 1);
  let year = String(TheDate.getFullYear()).padStart(4,'00');
  TheDate = weekday+", " + mon + '/' + dd +'/' + year;
  //end of time variables

  //verify if it's pm or AM
  let amORpm;
  if(hrs >= 0 && hrs <= 12){
      amORpm = "AM"
  }else{
      amORpm = "PM"
  };
  // The Mute function.
  const MuteMember = async (m, muteMsg) => {
    for (var i = 0; i < messageLog.length; i++) {
        if (messageLog[i].author == m.author.id) {
          messageLog.splice(i);
        }
      }
  
      punishedList.push(m.author.id);
      
      let user = m.guild.members.cache.get(m.author.id);
      let ReportChannel = m.guild.channels.cache.find(ch => ch.name === logChannel);
      if(!ReportChannel){
        try{
            ReportChannel = await m.guild.channels.create('mod-logs', {
              type: 'text',
              permissionOverwrites:[{
                id: m.guild.id,
                deny: ['VIEW_CHANNEL']
              }]
            })
              .then(m=> m.send(`Created **\`anti-spam-Logs\`** channel since a channel for reports wasn't provided.`))
              .catch(console.error)
  
        }catch(e){
          console.log(e.stack);
        }
      }; // end of creating the channel for anti spam logs

      let role = m.guild.roles.cache.find(namae => namae.name === mutedRole);      
      if (!role) {
        try {
            role = await m.guild.roles.create({
              data:{
                name: "Muted",
                color: "#000000",
                permissions: []
              },
              reason: `Muted role wasn't found! Created a new one!`
            })
            m.guild.channels.cache.forEach(async (thechann, id) => {
                await thechann.updateOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                });
            });
           ReportChannel.send(`Created **\`muted\`** role since a role wasn't provided.`) 
        } catch (e) {
            console.log(e.stack);
        }
    }//end of creating the role
    
      if (user) {
        user.roles.add(role).then(()=>{
          m.channel.send(`<@!${m.author.id}>, ${muteMsg}`);
          let muteEmbed = new MessageEmbed()
            .setAuthor('Action | Auto Mute', `https://images-ext-2.discordapp.net/external/Wms63jAyNOxNHtfUpS1EpRAQer2UT0nOsFaWlnDdR3M/https/image.flaticon.com/icons/png/128/148/148757.png`)
            .addField('Member Muted:',`${user}`)
            .addField(`Duration:`,`${timeMuted} seconds (10 min)`)
            .addField('Reason: ', `Spam`)
            .addField(`Time:`,TheDate+ " at "+ clock+" "+amORpm)
            .setColor('#D9D900')
          ReportChannel.send(muteEmbed);
          setTimeout(()=>{
            user.roles.remove(role);
            let unmutedEmbed = new MessageEmbed()
              .setAuthor('Action | Auto Unmute')
              .addField(`Member unmuted:`,`${user}`)
              .addField(`Reason:`,`Time Expired(10 min)`)
              .setColor('#D9D900')
          ReportChannel.send(unmutedEmbed)
          }, timeMuted);
          return true;
       }).catch((e) => {
          m.guild.owner.send(`Oops, seems like i don't have sufficient permissions to mute <@!${message.author.id}>!\n It can be that or another type of error happened! Tell me on github: https://github.com/MirageZoe/ \n Everything happened on ${TheDate} at ${clock} ${amORpm} with message:\n\n\`${e.message}\`\n\n *P.S: If this is the first time getting something like this, most likely because it was not set up good the log channel at beginning and didn't know where to send the reports. Do not panic, next time it will work since he created the channel where to send the reports!*`);
          return false;
      });
    }//end of user
  }
  
    
   // The warning function.
   const WarnMember = async (m, reply) => {
    warned.push(m.author.id);
    m.channel.send(`<@${m.author.id}>, ${reply}`);
   }

    if (message.author.bot) return;
    if (message.channel.type !== "text" || !message.member || !message.guild || !message.channel.guild) return;
   
    if (message.member.roles.cache.some(r => ignoredRoles.includes(r.name)) || ignoredMembers.includes(message.author.tag)) return;

    if (message.author.id !== client.user.id) {
      let currentTime = Math.floor(Date.now());
      authors.push({
        "time": currentTime,
        "author": message.author.id
      });
      
      messageLog.push({
        "message": message.content,
        "author": message.author.id
      });
      
      let msgMatch = 0;
      for (var i = 0; i < messageLog.length; i++) {
        if (messageLog[i].message == message.content && (messageLog[i].author == message.author.id) && (message.author.id !== client.user.id)) {
          msgMatch++;
        }
      }
      
      if (msgMatch == maxDuplicatesWarning && !warned.includes(message.author.id)) {
        WarnMember(message, warningMessage);
      }

      if (msgMatch == maxDuplicatesMute && !punishedList.includes(message.author.id)) {
        MuteMember(message, muteMessage);
      }

      var matched = 0;

      for (var i = 0; i < authors.length; i++) {
        if (authors[i].time > currentTime - interval) {
          matched++;
          if (matched == limitUntilWarn && !warned.includes(message.author.id)) {
            WarnMember(message, warningMessage);
          } else if (matched == limitUntilMuted) {
            if (!punishedList.includes(message.author.id)) {
              MuteMember(message, muteMessage);
            }
          }
        } else if (authors[i].time < currentTime - interval) {
          authors.splice(i);
          warned.splice(warned.indexOf(authors[i]));
          punishedList.splice(warned.indexOf(authors[i]));
        }

        if (messageLog.length >= 200) {
          messageLog.shift();
        }
      }
    }
  })
}

////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ANTI SPAM SYSTEM EMD



const { mongoose } = require("mongoose")
require('dotenv').config({ path: './.env' });

let String = ("")

mongoose.connect(process.env.MongooseDB, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//  useFindAndModify: false,
}).then(()=>{
            console.log('Connected To Mongoose Successfully!')
  })
.catch((err) => {
  console.log(err)
});

setInterval(async () => {
  await fetch('https://valiant-cloudy-ship.glitch.me').then(console.log('Pinged!'))
}, 240000)
      
client.login(Token);