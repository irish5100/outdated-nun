const { db } = require("quick.eco");

function counter(message, client, member) {
//  let channel = message.channel;
let channel = member.guild.channels.cache.find(channel => channel.id === '975421821212057620')
 let count = db.fetch(`counter_${message.guild.id}`);
  if (count === null) count = db.set(`counter_${message.guild.id}`, {
    number: 0,
    author: client.user.id
  });
  
  if (!message.author.bot && message.author.id === count.author) {
    message.delete();
    message.reply("Message Deleted | Reason: \n> `Please wait your turn.`\n") .then(m => m.delete({ timeout: 3000 }))

            setTimeout(function() {
    }, 5000);
    return;
  }
  if (!message.author.bot && isNaN(message.content)) {
    message.delete();
    message.reply("Message Deleted | Reason: \n> `Messages in this channel must be numbers`\n") .then(m => m.delete({ timeout: 3000 }))

            setTimeout(function() {
    }, 5000);
    return;
  }
  if (!message.author.bot && parseInt(message.content) !== count.number + 1) {
    message.delete();
    message.reply(`Message Deleted | Reason: \n> Wrong Number, Next number is ${count.number + 1} `) .then(m => m.delete({ timeout: 3000 }))

            setTimeout(function() {
    }, 5000);
    return;
  }
  count = db.set(`counter_${message.guild.id}`, { number: count.number + 1, author: message.author.id });
  channel.setTopic(`Next number would be ${count.number + 1}.`);
}

module.exports = counter;