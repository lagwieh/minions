const express = require('express');
const db = require('./db');
const ideaRouter = express.Router();
const ideas = db.getAllFromDatabase('ideas')

// GET METHOD
  // GET ALL IDEAS
ideaRouter.get('/', (req, res, next)=>{
  // console.log('ideas request arrived');
  res.send(ideas)
});

module.exports.ideaRouter = ideaRouter;