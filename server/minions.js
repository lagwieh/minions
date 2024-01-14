const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser')
const minionRouter = express.Router();
const minions = db.getAllFromDatabase('minions')

// console.log("minions: ",minions)

// minionRouter.use(bodyParser.json())

minionRouter.param('minionId', (req, res, next, id)=>{
  console.log(req.body);
  let minionId = id;
  try{
    const minionIdExists = minions.find(minion =>{
      return minion.id == minionId;
    });
    if(minionIdExists){
      req.minionId = minionId;
      next();
    }else{
      next(new Error('MINION NOT FOUND'))
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
  const minion = db.getFromDatabaseById("minions", req.minionId);
  console.log(minion);
  res.send(minion)
});
// POST METHOD
  // CREATE MINION
minionRouter.post('/', (req, res, next)=>{
  const minion = req.body
  minion.name = req.body.name || "";
  minion.title = req.body.title || "";
  minion.weaknesses = req.body.weaknesses || "";
  minion.salary = req.body.salary || 0;
  const newMinion = db.addToDatabase('minions',minion);
  // console.log(newMinion);
  res.status(201).send(newMinion);
});
// PUT METHOD
  // MODIFY MINION
minionRouter.put('/:minionId', (req, res, next)=>{
  // console.log(req.body)
  req.body.salary = req.body.salary === '' ? 0 : req.body.salary;
  minionUpdated = db.updateInstanceInDatabase('minions',req.body);
  res.send(minionUpdated);
  
});
// DELETE METHOD
  // DELETE MINION
minionRouter.delete('/:minionId',(req, res, next)=>{
  const isDeleted = db.deleteFromDatabasebyId('minions',req.minionId)
  res.status(204).send()
} );

// error middleware
minionRouter.use((err, req, res, next)=>{
  let status = err.status || 500;
  console.log(req.body)
  res.status(status).send(err.message)
});
module.exports.minionRouter = minionRouter;