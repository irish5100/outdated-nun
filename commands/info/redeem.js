const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");
const moment = require('moment')
const schema = require('../../models/code')
const User = require('../../models/User')


module.exports = {
  name: 'redeem',
  category: 'Premium',
  description: 'Redeem A Premium Code!',

  run: async (client, message, args, user, guild) => {
   
    // Check if the user with a unique ID is in our database.
    user = await User.findOne({
      Id: message.author.id, // if you are using slash commands, swap message with interaction.
    })

    // Check Users input for a valid code. Like `!redeem ABCD-EFGH-IJKL`
    let code = args[0]

    // Return an error if the User does not include any Premium Code
    if (!code) {
      const embed = new MessageEmbed()
            .setColor('0xff0000')
            .setTitle(`:x: | Missing Argument`)
            .setDescription(`Please include a code to redeem!`)
      message.channel.send(embed)
      } 
  
  

    // If the user is already a premium user, we dont want to save that so we return it.
    if (user && user.isPremium) {
      const embed = new MessageEmbed()

            .setColor('0xff0000')
            .setTitle(`:x: | Error`)
            .setDescription(`You already have premium access!`)
message.channel.send(embed)
      }
    

    // Check if the code is valid within the database
    const premium = await schema.findOne({
      code: code,
    })

    // Set the expire date for the premium code
    if (premium) {
      const expires = moment(premium.expiresAt).format(
        'dddd, MMMM Do YYYY HH:mm:ss',
        )


     // Once the code is expired, we delete it from the database and from the users profile
      user.isPremium
      user.premium.redeemedBy.push(message.author)
      user.premium.redeemedAt = Date.now()
      user.premium.expiresAt = premium.expiresAt
      user.premium.plan = premium.plan


      // Save the User within the Database
      user = await user.create({ new: true }).catch(() => {})
      client.userSettings.set(message.author.id, user)
      await premium.deleteOne().catch(() => {})

      // Send a success message once redeemed
      const embed = new MessageEmbed()

            .setTitle('Premium Redeemed')
            .setDescription(`:white_check_mark: Success | You Have Claimed A Code\n\n\`Expires: ${expires}\``)
            .setColor('0x5eff00')
            .setTimestamp()

      

      // Error message if the code is not valid.
        } else {
      const embed = new MessageEmbed()
          new Discord.MessageEmbed()
            .setColor('0xff0000')
            .setTitle(`:x: | Error`)
            .setDescription(`Invalid Code!`,)
          message.channel.send(embed)
      }
    }
  }