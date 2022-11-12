const express = require('express');
const { logger, createContext} = require('./logger');
const { _insert, _findAll, _findById, _update, _delete } = require('./memoryDB');

const app = express();
const port = 3000;

app.use(express.json());
app.use(createContext({serviceName:'my-simple-app'}))

app.get('/doc', (req, res) => {
  logger.info("HELLO LOGGER");
  res.send(_findAll());
})
app.post('/doc', (req, res) => {
  try {
    const docWithId = _insert(req.body);
    res.json(docWithId);
  } catch (error) {
    logger.error("FAILED TO INSERT:",{error:{stack:error.stack, message: error.message}});
    res.sendStatus(400);
  }
})
app.put('/doc/:id', (req, res) => {
  try {
    _update(req.params.id,req.body);
    res.sendStatus(200);
  } catch (error) {
    logger.error("FAILED TO INSERT:",{error:{stack:error.stack, message: error.message}});
    res.sendStatus(400);
  }
})
app.delete('/doc/:id', (req, res) => {
  try {
      _delete(req.params.id,req.body);
    res.sendStatus(200);
  } catch (error) {
    logger.error("FAILED TO INSERT:",{error:{stack:error.stack, message: error.message}});
    res.sendStatus(400);
  }
})
app.get('/doc/:id', (req, res) => {
  try {
    logger.info("SEARCHING ID:",req.params.id);
    res.send(_findById(req.params.id));
  } catch (error) {
    logger.error("COULD NOT GET ID:",{error:{stack:error.stack, message: error.message}});
    res.sendStatus(400);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
