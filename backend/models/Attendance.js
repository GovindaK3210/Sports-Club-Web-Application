const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Attendance = new Schema({

   player_id: {
      type: Number
   },
   date: {
      type: Date
   },
   time: {
       type: String
   }
   
   
}, {
   collection: 'Attendance'
})

module.exports = mongoose.model('Attendance', Attendance)