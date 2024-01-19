const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser')
const minionRouter = express.Router();
const minions = db.getAllFromDatabase('minions')
const {workRouter} = require('./work')

// console.log("minions: ",minions)

// minionRouter.use(bodyParser.json())
minionRouter.use('/:minionId/work', workRouter)
minionRouter.param('minionId', (req, res, next, id)=>{
  // console.log(req.body);
  console.log(id)
  let minionId = id;
  try{
    if(minionId instanceof String){
      const oError = new Error('MINION ID MUST BE A NUMBER');
      oError.status = 404;
      next(oError);
    }
    const minionIdExists = minions.find(minion =>{
      return minion.id == minionId;
    });
    if(minionIdExists){
      req.minionId = minionId;
      next();
    }else{
      const oError = new Error('MINION ID MUST BE A NUMBER');
      oError.status = 404;
      next(oError);
    }
  } catch (err){
    next(err);
  };
})
// GET METHOD
  //GET ALL MINIONS
minionRouter.get('/', (req,res,next)=>{
  // console.log("minions request arrived")
  res.send(minions);
});
  // GET MINION BY ID
minionRouter.get('/:minionId', (req, res, next)=>{
  try {
    const minion = db.getFromDatabaseById("minions", req.minionId);
    // console.log(minion);
    if(minion){
      res.send(minion);
    }else{
      next(new Error('Model properties error or minion not found'));
    }
    
    
  } catch (error) {
    const oError = error;
    oError.status = 404;
    next(oError);
  }
});
// POST METHOD
  // CREATE MINION
minionRouter.post('/', (req, res, next)=>{
  const minion = req.body
  minion.name = req.body.name || "";
  minion.title = req.body.title || "";
  minion.weaknesses = req.body.weaknesses || "";
  minion.salary = req.body.salary || 0;
  
  try {
    const newMinion = db.addToDatabase('minions',minion);
    if(newMinion){
      res.status(201).send(newMinion)
    }else{
      next(new Error('MODEL NOT VALID'))
    }
  } catch (error) {
    next(error)
  }
  // console.log(newMinion);
  
});
// PUT METHOD
  // MODIFY MINION
minionRouter.put('/:minionId', (req, res, next)=>{
  // console.log(req.body)
  try {
    req.body.salary = req.body.salary === '' ? 0 : req.body.salary;
    minionUpdated = db.updateInstanceInDatabase('minions',req.body);
    if(minionUpdated){
      res.send(minionUpdated)
    }else{
      next(new Error('MINION NOT UPDATED'))    
    }
  } catch (error) {
    next(error)
  }
  
});
// DELETE METHOD
  // DELETE MINION
minionRouter.delete('/:minionId',(req, res, next)=>{
  try {
    const isDeleted = db.deleteFromDatabasebyId('minions',req.minionId);
    if(isDeleted){
      res.status(204).send();
    }else{
      next(new Error('MINION NOT DELETED'))
    }
    
  } catch (error) {
    next(error)
  }
} );

// error middleware
minionRouter.use((err, req, res, next)=>{
  let status = err.status || 500;
  res.status(status).send(err.message)
});

module.exports.minionRouter = minionRouter;