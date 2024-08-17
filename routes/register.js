// routes/signup.js

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET request to render the registration form
router.get('/', (req, res) => {
  res.render('register');
});


module.exports = router;
