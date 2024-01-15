const express = require('express');
const db = require('./db');
const ideaRouter = express.Router();
const ideas = db.getAllFromDatabase('ideas')

ideaRouter.param('ideaId', (req, res, next, id) => {
  let ideaId = id
  try {
    const ideaIdExists = ideas.find(idea => {
      return idea.id == ideaId;
    });
    if (ideaIdExists) {
      req.ideaId = ideaId;
      next();
    } else {
      next(new Error('IDEA NOT FOUND'));
    }
  } catch (err) {
    next(err);
  }
});
// GET METHOD
// GET ALL IDEAS
ideaRouter.get('/', (req, res, next) => {
  // console.log('ideas request arrived');
  res.send(ideas)
});
//GET IDEA BY ID
ideaRouter.get('/:ideaId', (req, res, next) => {
  const idea = db.getFromDatabaseById('ideas', req.ideaId)
  res.send(idea)
});
// POST METHOD
ideaRouter.post('/', (req, res, next) => {


  try {
    const idea = req.body;
    // console.log(Object.keys(meeting))
    if (Object.keys(idea) != 0) {
      idea.name = idea.name || '';
      idea.description = idea.description || '';
      idea.numWeeks = idea.numWeeks || 0;
      idea.weeklyRevenue = idea.weeklyRevenue || 0;
      db.addToDatabase('ideas', idea)
      res.status(201).send(idea)
    }
  } catch (err) {
    next(err);
  }

});
// PUT METHOD
// MODIFY IDEA
ideaRouter.put('/:minionId', (req, res, next) => {

  ideaUpdated = db.updateInstanceInDatabase('ideas', req.body);
  res.send(ideaUpdated);

});
// DELETE METHOD
ideaRouter.delete('/:ideaId',(req, res, next)=>{
  const isDeleted = db.deleteFromDatabasebyId('ideas',req.ideaId)
  res.status(204).send()
} );

// ERROR MIDDLEWARE
ideaRouter.use((err, req, res, next) => {
  let status = err.status || 500;
  res.status(status).send(err.message)
});
module.exports.ideaRouter = ideaRouter;