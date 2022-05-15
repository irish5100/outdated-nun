const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
module.exports = new Command({
  // options
  name: "testing",
  description: `Show A Testing Message`,
  userPermissions: ["SEND_MESSAGES"],
  category: "Information",
  premium: true,
  // command start
  run: async ({ client, interaction, args, message}) => {
    const embed = new MessageEmbed()
    .setColor(`BLURPLE`)
    .setTitle(`Testing!`)
    .setDescription(`Testing`)
  },
});