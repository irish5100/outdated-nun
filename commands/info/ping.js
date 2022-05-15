const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");
const prettyMilliseconds = require("pretty-ms");

const os = require('os');
const si = require('systeminformation');

module.exports = {
  name: "ping",
  aliases: [],
  description: "Gives Bots Ping Information!",
  usage: "Ping",
  run: async (client, message, args) => {

    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    
    let gatewayLatency = Math.floor(client.ws.ping);
    message.channel.send("Pinging...").then(m => {
        const trip = Math.floor(m.createdTimestamp - message.createdTimestamp);
        const embed = new MessageEmbed()
            .setTitle("Bot Ping Information!")
            .addField("Bot Latency", `<:2365win11checkicon:954504349533491261> ${gatewayLatency} ms`, true)
            .addField("API Latency", `<:2365win11checkicon:954504349533491261> ${trip} ms`, true)
            .addField("Bot Uptime", `<:2365win11checkicon:954504349533491261> ${days} Day(s), ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`, true)            
            .setColor("#7289DA")
            .setTimestamp();
        m.edit(embed);
    });
}

}