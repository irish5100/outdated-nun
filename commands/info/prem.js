const User = require("../../models/User");
const moment = require("moment");
const MessageEmbed = require("discord.js");

// Change this to your own handler.
module.exports = {
  name: "prem",
  category: "Premium",
  description: "Premium Only Command!",

  run: async (client, message, args, user, guild) => {
  
    try {
    
    // Check if the User is premium and send him the "secret" command => only available for premium users.
    if (user && user.isPremium) {
       message.author.send({ content: "Hey Hey, welcome to the Premium Users." })
     
    // if the user is not a premium user, return an error.
    } else {
      return message.channel.send({ content: ":x: Invalid Permissions | Needed Permission(s): \n> Premium Member" });
    }
    } catch (err) {
        console.log(err)
        message.channel.send({ content: ":x: Error | Try Again Later" })
     }
  },
};