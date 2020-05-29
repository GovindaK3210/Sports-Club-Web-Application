const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = require('mongoose').Types.ObjectId; 

// Define collection and schema
let PracticeSession = new Schema({

   game: {
      type: String
   },
   player1_id: {
      type: String
   },
   player2_id: {
      type: String
   },
   coach_id: {
      type: String
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
   },
   date:
   {
      type: String
   }
   
}, {
   collection: 'PracticeSession'
})

module.exports = mongoose.model('PracticeSession', PracticeSession)