const express = require('express');
const db = require('./db');

const apiRouter = express.Router();

// get all minions
apiRouter.get('/minions', (req, res, next) => {
  const minions = db.getAllFromDatabase('minions');
  res.send(minions);
});
// get all ideas
apiRouter.get('/ideas', (req, res, next) => {
  const ideas = db.getAllFromDatabase('ideas');
  res.send(ideas);
});
// get all meetings
apiRouter.get('/meetings', (req, res, next) => {
  const meetings = db.getAllFromDatabase('meetings');
  res.send(meetings);
});

// post meeting
apiRouter.post('/meetings', (req, res, next) => {
  const newMeeting = db.createMeeting();
  res.status(201).send(newMeeting);
});


module.exports = apiRouter;
