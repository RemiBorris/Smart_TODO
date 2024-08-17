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

router.get('/:id/task', (req, res) => {
  notesQueries.getNote(req.params.id).then((task) => {
    const category = {
      1: "Books",
      2: "Films/TV Shows",
      3: "Products",
      4: "Restaurants",
      5: "Other"
    }
    const currentCategory = category[task["category_id"]] || "";
    res.render('task', { task, currentCategory })
  })
})

module.exports = router;
