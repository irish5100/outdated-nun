const { tictactoe } = require('reconlx')

  module.exports = {
  name: "tictactoe",
  aliases: ["ttt"],
  description: "Play TicTacToe with another member!",
  usage: "tictactoe <Mention Member>",
  run: async (client, message, args) => {
    //start
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}
//end