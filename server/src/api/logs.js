const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res) => {
  const entries = await LogEntry.find();
  res.json(entries);
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const LogUpdate = await LogEntry.updateOne({ _id: req.query.id }, req.body);
    res.json(LogUpdate);
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404);
    }
    next(error);
  }
});

module.exports = router;
