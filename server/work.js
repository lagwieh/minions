const express = require('express');
const workRouter = express.Router({ mergeParams: true });
const db = require('./db');
// const workData = db.getAllFromDatabase('work');

workRouter.param('workId', (req, res, next, id) => {
  // console.log(req.body);
  let workId = id;
  const workData = db.getAllFromDatabase('work');
  const workEntriesById = workData.filter(workEntry => {
    return workEntry.minionId == req.minionId;
  });
  try {
    const workIdExists = workEntriesById.find(work => {
      return work.id == workId;
    });
    // console.log(workIdExists)
    if (workIdExists) {
      req.workId = workId;
      req.oWorkEntry = req.body
      next();
    } else {
      const oError = new Error('WORK ID NOT FOUND');
      oError.status = 400;
      next(oError)
    }
  } catch (err) {
    next(err);
  };
})

// GET ALL WORK ENTRIES BY MINION ID
workRouter.get('/', (req, res, next) => {
  const allWorkEntries = db.getAllFromDatabase('work');
  // console.log(req.body);
  // console.log(allWorkEntries)
  const workEntriesById = allWorkEntries.filter(workEntry => {
    return workEntry.minionId == req.minionId;
  });
  // console.log("C ",workEntriesById)
  res.send(workEntriesById)
});

// POST AN ENTRY WORK
workRouter.post('/', (req, res, next) => {

  try {
    const newEntryWork = req.body;
    newEntryWork.title = newEntryWork.title || '';
    newEntryWork.description = newEntryWork.description || '';
    newEntryWork.hours = newEntryWork.hours || 0;
    newEntryWork.title = newEntryWork.title || '';
    newEntryWork.minionId = newEntryWork.minionId || req.minionId; 
    const newWorkEntry = db.addToDatabase('work', newEntryWork);
    // console.log(workData)
    if (newWorkEntry) {
      res.status(201).send(newWorkEntry)

    } else {
      next(new Error('WORK NOT ADDED'))
    }
  } catch (error) {
    next(error);
  }

});

// PUT WORK BY WORKID
workRouter.put('/:workId', (req, res, next) => {
  console.log("asd ", req.body)
  const newEntryWork = req.body;
  newEntryWork.title = newEntryWork.title || '';
  newEntryWork.description = newEntryWork.description || '';
  newEntryWork.hours = newEntryWork.hours || 0;
  newEntryWork.title = newEntryWork.title || '';
  newEntryWork.minionId = newEntryWork.minionId || req.minionId;
  console.log(req.minionId, req.workId)
  try {
    const updatedWorkEntry = db.updateInstanceInDatabase('work', req.body);

    res.send(updatedWorkEntry)

  } catch (error) {
    error.status = 400;
    next(error)
  }
  // console.log(db.getAllFromDatabase('work'))
});
// DELETE WORK BY WORK ID
workRouter.delete('/:workId', (req, res, next) => {
  try {
    const isDeleted = db.deleteFromDatabasebyId('work', req.workId);
    if (isDeleted) {
      res.status(204).send();
    } else {
      next(new Error('WORK NOT DELETED'))
    }

  } catch (error) {
    next(error)
  }
});


workRouter.use((err, req, res, next) => {
  let status = err.status || 500;
  console.log(req.body)
  res.status(status).send(err.message)
});

module.exports.workRouter = workRouter;