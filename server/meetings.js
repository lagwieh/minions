const express = require('express');
const db = require('./db');
const meetingRouter = express.Router();
let meetings = db.getAllFromDatabase('meetings')
// console.log(meetings)
// PARAM ROUTER
meetingRouter.param('meetingId', (req, res, next, id)=>{
  console.log(id)
  let meetingId = id
  try {
    const meetingIdExists = meetings.find(meeting=>{
      return meeting.id == meetingId;
    });
    if(meetingIdExists){
      req.meetingId = meetingId;
      next();
    }else{
      next(new Error('MEETING NOT FOUND'));
    }
  } catch (err) {
    next(err);
  }
});
// GET METHOD
  // GET ALL MEETINGS
meetingRouter.get('/', (req, res, next)=>{
  // console.log('meetings request arrived');
  res.send(meetings);
});
  // GET MEETING BY ID
meetingRouter.get('/:meetingId', (req, res, next)=>{
  const meeting = db.getFromDatabaseById('minions', req.meetingId);
  res.send(meeting);
});
// POST METHOD
meetingRouter.post('/', (req, res, next)=>{
  
 
  try {
    const meeting = req.body;
    // console.log(Object.keys(meeting))
    if(Object.keys(meeting)!=0){
      meeting.time = meeting.time || '';
      meeting.date = meeting.date || new Date();
      meeting.day = meeting.day || '';
      meeting.note = meeting.note || '';
      db.addToDatabase('meetings',meeting)
      res.status(201).send(meeting)
    }else{
      const newRandomMeeting = db.createMeeting()
      // console.log(meetings)
      // res.send(newRandomMeeting)
    }
  } catch (error) {
    next(err);
  }

});
// DELETE METHOD
  // DELETE ALL MEETINGS
meetingRouter.delete('/', (req, res, next)=>{
  const deletedDb = db.deleteAllFromDatabase('meetings');
  meetings = deletedDb;
  res.status(204).send();
});
// ERROR MIDDLEWARE
meetingRouter.use((err, req, res, next)=>{
  let status = err.status || 500;
  res.status(status).send(err.message)
});

module.exports.meetingRouter = meetingRouter;