const express = require('express');
// routers
const {minionRouter} = require('./minions');
const {ideaRouter} = require('./ideas');
const {meetingRouter} = require('./meetings');
// console.log(minionRouter);
const db = require('./db');

const apiRouter = express.Router();


apiRouter.use('/minions',minionRouter);
apiRouter.use('/ideas', ideaRouter);
apiRouter.use('/meetings', meetingRouter);

// // post meeting
// apiRouter.post('/meetings', (req, res, next) => {
//   const newMeeting = db.createMeeting();
//   res.status(201).send(newMeeting);
// });


module.exports = apiRouter;
