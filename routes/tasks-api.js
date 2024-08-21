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
const { autoCategorize } = require('../lib/helper/categorize_task');

//CREATE - POST
router.post('/', (req, res) => {
  const task = req.body;

  autoCategorize(task.name)
    .then((resp) => {
      task.category_id = resp.category_id

      tasksQueries
        .create(task)
        .then((task) => {
          res.status(201).json({ message: 'Task created!', task });
        })
        .catch((err) => {
          res.status(500).json({ message: 'Error creating task', error: err.message });
        });
    })
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

//Update / Edit
router.post('/:id', (req,res) => {
  const updatedTask = req.body;

  tasksQueries
    .updateTask(updatedTask)
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating task', error: err.message });
    });
})

//Update Task Status (is_complete)
router.post('/:id/updateStatus', (req, res) => {
  const task = req.body;

  tasksQueries
    .updateStatus(task)
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating task', error: err.message });
    });
})

module.exports = router;
