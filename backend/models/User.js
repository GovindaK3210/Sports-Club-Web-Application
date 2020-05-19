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
      type: Number
   },
   games_of_interest: {
      type: String
   },
   games_ranking: {
      type: String
   },
   games_priority: {
      type: String
   },
   opponent_player_ranking: {
      type: String
   },
   start_time: 
   {
      type: String
   },
   end_time:
   {
      type: String
   },
   games_and_ranking: {
      type: [[String]]
   }
   
}, {
   collection: 'users'
})

module.exports = mongoose.model('User', User)