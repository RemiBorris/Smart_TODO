/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const categoryQueries = require('../db/queries/categories');

router.get('/:id/tasks', (req, res) => {
  // get the user's list of tasks from dbase using the tasks-api (query to server, retrieve data from the dbase and return as json)
  const userId = req.params.id;
  const categorizedTasks = {};

  userQueries.getUserWithId(userId).then((user) => {
    categoryQueries.getCategories().then((categories) => {
      userQueries.getUserTasks(user.id).then((tasks) => {
        categories.forEach((category) => {
          categorizedTasks[category.id] ||= []

          const task = tasks.find((task) => task.category_id == category.id)
          categorizedTasks[category.id].push(task)
        })

        res.render('tasks/index', { user, categorizedTasks, categories });
      })
    })
  })
});

module.exports = router;
