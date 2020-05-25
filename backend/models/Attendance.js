const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Attendance = new Schema({

   player_id: {
      type: String
   },
   date: {
      type: String
   },
   time: {
       type: String
   },
   allowSchedule: {
      type: Boolean,
      default: false
   }
   
}, {
   collection: 'Attendance'
})

module.exports = mongoose.model('Attendance', Attendance)