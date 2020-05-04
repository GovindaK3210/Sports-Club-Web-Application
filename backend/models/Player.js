const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Player = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'players'
})

module.exports = mongoose.model('Player', Player)