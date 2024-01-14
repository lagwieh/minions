const express = require('express');
const db = require('./db');
const meetingRouter = express.Router();
const meetings = db.getAllFromDatabase('meetings')
// GET METHOD
  // GET ALL MEETINGS
meetingRouter.get('/', (req, res, next)=>{
  console.log('meetings request arrived');
  res.send(meetings)
});

module.exports.meetingRouter = meetingRouter;