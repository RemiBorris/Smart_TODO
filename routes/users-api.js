/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id/tasks', (req, res) => {
  userQueries.getTasks()
    .then((tasks) => {
      res.json({ tasks }); //array of tasks
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//Update
router.post('/:id', (req,res) => {
  console.log("EDIT PROFILE...")
  const updatedProfile = req.body;

  userQueries
    .updateUser(updatedProfile )
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating task', error: err.message });
    });
  });

module.exports = router;
