const { red, green, blue, yellow, cyan} = require('chalk');
const chalk = require('chalk');
const { Prefix, Token, Color, token, MongooseConnectionString } = require("./config.js");
module.exports = (client) => {
    console.log(`${client.user.tag} is online!`)
  

  client.user.setActivity(`Earth SMP | !help`, { type: "WATCHING" })
};
