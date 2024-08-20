const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const booksApi = require('./books_api');
const moviesApi = require('./movies_api');
const productsApi = require('./product_api');
const restaurantsApi = require('./restaurant_api');


router.get('/', (req, res) => {


  const autoCategorize = function(taskName) {

  const lowerCaseTaskName = taskName.toLowerCase()

  if (lowerCaseTaskName.startsWith('watch') || lowerCaseTaskName.startsWith('binge')) {
    return category = 2
  } else if (lowerCaseTaskName.startsWith('read')) {
    return category = 1
  } else if (lowerCaseTaskName.startsWith('eat')) {
    return category = 4
  } else if (lowerCaseTaskName.startsWith('buy') || lowerCaseTaskName.startsWith('purchase')) {
    return category = 3
  };

    Promise.all([isMovie(taskName), isBook(taskName), isRestaurant(taskName), isProduct(taskName)])
      .then((values) => { //values [true, true, false, true]
        if(values[0]) {
          return category = 2;
        } else if (values[1]) {
          return category = 1;
        } else if (values[2]) {
          return category = 4;
        }else if (values[3]) {
          return category = 3;
        }
      }
    )
  }
});


module.exports = router;
