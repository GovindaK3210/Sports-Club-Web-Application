const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let PracticeSession = new Schema({

   game: {
      type: String
   },
   player1_id: {
      type: Number
   },
   player2_id: {
      type: Number
   },
   coach_id: {
      type: Number
   },
   game_court: {
      type: String
   },
   ranking_player1: {
       type: Number
   },
   ranking_player2: {
    type: Number
   },
   start_time: 
   {
      type: String
   },
   end_time:
   {
      type: String
   }
   
}, {
   collection: 'PracticeSession'
})

module.exports = mongoose.model('PracticeSession', PracticeSession)