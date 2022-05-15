const mongoose = require('mongoose')

let Scheme = new mongoose.Schema({
  guildid: String,
  user: String,
  content: Array
})
module.exports = mongoose.model('warns', Scheme)