const express = require('express');
const db = require('./db');
const minionRouter = express.Router();
const minions = db.getAllFromDatabase('minions')
console.log("minions: ",minions)
// minionRouter.param
// GET METHOD
  //GET ALL MINIONS
minionRouter.get('/', (req,res,next)=>{
  console.log("minions request arrived")
  res.send(minions)
})

module.exports.minionRouter = minionRouter;