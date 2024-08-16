/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//Task-api

const express = require('express');
const router = express.Router();
const tasksQueries = require('../db/queries/tasks');

//CREATE - POST
router.post('/', (req, res) =>{

  tasksQueries
  .create(task)
  .then((task) => {
    res.status(201).json({ message: 'Note created!', task });
  })
  .catch((err) => {
    res
      .status(500)
      .json({ message: 'Error creating note', error: err.message });
  });
});

// Delete
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  tasksQueries.deleteTask(id)
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting task', error: err.message });
    });
});

module.exports = router;
