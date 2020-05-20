const express = require('express');
const app = express();
const practiceSessionRoute = express.Router();

// Practice Session Model
let PracticeSession = require('../models/PracticeSession');

// Add single PracticeSession
practiceSessionRoute.route('/create').post((req, res, next) => {
  PracticeSession.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Practice Sessions
practiceSessionRoute.route('/').get((req, res) => {
  PracticeSession.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single PracticeSession by Session ID
practiceSessionRoute.route('/read/:id').get((req, res) => {
  PracticeSession.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get all Practice Sessions for a particular Player ID
practiceSessionRoute.route('/read-by-playerid/:id').get((req, res) => {
    PracticeSession.find({ $or: [{ player1_id: req.params.id }, { player2_id: req.params.id }] }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  // Get all Practice Sessions for a particular Coach ID
practiceSessionRoute.route('/read-by-coachid/:id').get((req, res) => {
    PracticeSession.find({ coach_id: req.params.id }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })



// Update Single PracticeSession by SessionID
practiceSessionRoute.route('/update/:id').put((req, res, next) => {
  PracticeSession.findByIdAndUpdate(req.params.id, {
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

// Delete Single PracticeSession by SessionID
practiceSessionRoute.route('/delete/:id').delete((req, res, next) => {
  PracticeSession.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = practiceSessionRoute;