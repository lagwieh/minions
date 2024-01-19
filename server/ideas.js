const express = require('express');
const db = require('./db');
const ideaRouter = express.Router();
const ideas = db.getAllFromDatabase('ideas')
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

// console.log(ideas)
ideaRouter.param('ideaId', (req, res, next, id) => {
  let ideaId = id
  console.log(id)
  try {
    if(ideaId instanceof String){
      const oError = new Error('IDEA ID MUST BE A NUMBER');
      oError.status = 404;
      next(oError);
    }
    const ideaIdExists = ideas.find(idea => {
      return idea.id == ideaId;
    });
    if (ideaIdExists) {
      req.ideaId = ideaId;
      next();
    } else {
      const oError = new Error('IDEA NOT FOUND');
      oError.status = 404;
      next(oError);
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
  console.log("hola")
  const idea = db.getFromDatabaseById('ideas', req.ideaId)
  console.log(idea)
  res.send(idea)
});
// POST METHOD
ideaRouter.post('/',checkMillionDollarIdea, (req, res, next) => {


  try {
    const idea = req.body;
    console.log(idea)
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
  try {
    ideaUpdated = db.updateInstanceInDatabase('ideas', req.body);
    if(ideaUpdated){
      res.send(ideaUpdated);

    }else{
      const oError = new Error('MODEL NOT FOUND');
      oError.status = 404;
      next(oError)
    }
    
  } catch (err) {
    next(err )
  }

});
// DELETE METHOD
ideaRouter.delete('/:ideaId',(req, res, next)=>{
  try {
    const isDeleted = db.deleteFromDatabasebyId('ideas',req.ideaId)
    if(isDeleted){
      res.status(204).send()
    }else{
      next(new Error('IDEA NOT DELETED'))
    }
    
  } catch (error) {
    next(error)
  }
} );

// ERROR MIDDLEWARE
ideaRouter.use((err, req, res, next) => {
  console.log(err.status)
  let status = err.status || 500;
  res.status(status).send(err.message)
});
module.exports.ideaRouter = ideaRouter;