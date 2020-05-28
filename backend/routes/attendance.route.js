const express = require('express');
const app = express();
const attendanceRoute = express.Router();

// Player model
let Attendance = require('../models/Attendance');

// Add single Attendance
attendanceRoute.route('/create').post((req, res, next) => {
  Attendance.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
     
      res.json(data)
    }
  })
});

// Get All Attendance 
attendanceRoute.route('/').get((req, res) => {
  Attendance.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Attendance by DATE
attendanceRoute.route('/find-date/:date').get((req, res) => {
  Attendance.find({date: req.params.date},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Attendance by Attendance ID
attendanceRoute.route('/read/:id').get((req, res) => {
  Attendance.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Attendance by player id and date
attendanceRoute.route('/read-special/:id/:date').get((req, res) => {
  Attendance.find( {$and:  [{player_id: req.params.id},{date: req.params.date}] }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error)
    } else {
      res.json(data)
    }
  })
})


  // Get all Attendances for a particular player ID
  attendanceRoute.route('/read-by-playerid/:id').get((req, res) => {
    Attendance.find({ player_id: req.params.id }, (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
      }
    })
  })


// Update single Attendance by Attendance ID
attendanceRoute.route('/update/:id').put((req, res, next) => {
  Attendance.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete single Attendance by Attendance ID
attendanceRoute.route('/delete/:id').delete((req, res, next) => {
  Attendance.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = attendanceRoute;