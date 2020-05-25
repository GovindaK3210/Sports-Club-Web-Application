const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({

   name: {
      type: String
   },
   email: {
      type: String
   },
   role: {
      type: String
   },
   password: {
      type: String
   },
   phoneNumber: {
      type: String
   },
   games_priority: {
      type: [String]
   },
   opponent_player_ranking: {
      type: String,
      default: "Beginner"
   },
   startTime: 
   {
      type: String
   },
   endTime:
   {
      type: String
   },
   games_info:
   {
      type: [Object]
   }
   
}, {
   collection: 'users'
})

module.exports = mongoose.model('User', User)