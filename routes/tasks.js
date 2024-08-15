/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// /users/1/tasks

const express = require('express');
const router  = express.Router();



router.get('/', (req, res) => {

  console.log("REQUEST: ", req.params.id);

  res.render('tasks/index');
});

router.get('/:id/edit', (req, res) => {
  res.render('tasks/edit');
});

module.exports = router;
