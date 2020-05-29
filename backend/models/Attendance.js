const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Attendance = new Schema({

   player_id: {
      type: String
   },
   player_name: {
      type: String
   },
   date: {
      type: String
   },
   time: {
       type: String
   },
   allowSchedule: {
      type: Boolean
   },

   desired_opponent_id: {
      type: String,
      default: "system"
   },

   desired_opponent_name: {
      type: String,
      default: "system"
   }
   
}, {
   collection: 'Attendance'
})

module.exports = mongoose.model('Attendance', Attendance)