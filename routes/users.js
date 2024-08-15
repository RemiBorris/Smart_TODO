/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


router.get('/:id/tasks', (req, res) => {
  // get the user's list of tasks from dbase using the tasks-api (query to server, retrieve data from the dbase and return as json)
  const userId = req.params.id;

  userQueries.getUserTasks(userId).then((tasks) => {
    console.table(tasks)
    res.render('tasks/index', { tasks });
  })

});

module.exports = router;
