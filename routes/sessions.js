/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

// GET request to render the login form
router.get('/login', (req, res) => {
  res.render('login');
});

// logout
router.post('/logout', (req, res) => {
  req.session.user = null;
  res.redirect("/");
});

module.exports = router;
